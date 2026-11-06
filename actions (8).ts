"use server";

import { revalidatePath } from "next/cache";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import { REVIEW_SERVICES } from "@/lib/reviews";

export type SubmitReviewState = {
  status: "idle" | "success" | "error";
  message?: string;
};

// false = new reviews wait as 'pending' until you approve them in Supabase
// (Table Editor → reviews → set status to 'approved'). Recommended, because
// the order number is not checked against anything. Set to true to publish
// instantly.
const AUTO_APPROVE = false;

// Accepts a plausible email or phone number. Deliberately loose.
function isValidContact(value: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+]?[\d\s()-]{7,20}$/;
  return emailPattern.test(value) || phonePattern.test(value);
}

export async function submitReview(
  _prev: SubmitReviewState,
  formData: FormData
): Promise<SubmitReviewState> {
  // Honeypot: real users never see this field.
  if (String(formData.get("hp_field_9k2") ?? "").trim()) {
    return { status: "success", message: "Thanks for your review!" };
  }

  // Timestamp trap: reject anything submitted implausibly fast.
  const renderedAt = Number(formData.get("form_rendered_at") ?? 0);
  if (renderedAt && Date.now() - renderedAt < 1500) {
    return { status: "success", message: "Thanks for your review!" };
  }

  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const review = String(formData.get("review") ?? "").trim();
  const orderNumber = String(formData.get("order_number") ?? "").trim();
  const contact = String(formData.get("contact") ?? "").trim();
  const rating = Number(String(formData.get("rating") ?? "").trim());

  if (!name || !country || !review) {
    return { status: "error", message: "Please fill in your name, country, and review." };
  }
  if (name.length > 80 || company.length > 80 || country.length > 60) {
    return { status: "error", message: "One of your answers is too long." };
  }
  if (!orderNumber) {
    return { status: "error", message: "Please enter your order number." };
  }
  if (!contact || !isValidContact(contact)) {
    return { status: "error", message: "Please enter a valid phone number or email address." };
  }
  if (review.length > 1000) {
    return { status: "error", message: "Please keep your review under 1000 characters." };
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { status: "error", message: "Please choose a rating from 1 to 5." };
  }
  if (service && !REVIEW_SERVICES.includes(service)) {
    return { status: "error", message: "Please choose a service from the list." };
  }

  try {
    const supabase = getSupabaseServerClient();

    // status is set here, never taken from the form, so visitors can't
    // choose their own. order_number and contact are private (never selected
    // by lib/get-reviews.ts) and exist so you can verify genuine clients.
    const { error } = await supabase.from("reviews").insert({
      name,
      company: company || null,
      country,
      service: service || null,
      rating,
      review,
      status: AUTO_APPROVE ? "approved" : "pending",
      order_number: orderNumber,
      contact,
    });

    if (error) {
      console.error("submitReview insert error:", error);
      return { status: "error", message: "Something went wrong saving your review. Please try again in a moment." };
    }

    if (AUTO_APPROVE) {
      revalidatePath("/");
      revalidatePath("/reviews");
    }

    return {
      status: "success",
      message: AUTO_APPROVE
        ? "Your review has been published. Thanks for sharing your experience!"
        : "Thanks! Your review has been received and will appear once we've verified your order.",
    };
  } catch (err) {
    console.error("submitReview error:", err);
    return { status: "error", message: "Something went wrong. Please try again shortly." };
  }
}
