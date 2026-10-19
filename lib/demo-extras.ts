// Sample data and helpers for the three demo panels (Inbox, Leads, Manage) on /ai-chatbot.
// Everything here is FICTIONAL and lives in the browser only: no database, nothing is saved.
// In a real client build the same screens read from a database instead of these arrays.
// Phone numbers are deliberately fake (000) so the Call / WhatsApp buttons never reach a real person.

import type { DemoNicheId } from "@/lib/demo-bots";

export type ConvStatus = "open" | "waiting" | "resolved";
export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";
export type Priority = "low" | "medium" | "high";
export type BookingStatus = "pending" | "confirmed" | "cancelled";

export const CONV_STATUSES: { id: ConvStatus; label: string }[] = [
  { id: "open", label: "Open" },
  { id: "waiting", label: "Waiting" },
  { id: "resolved", label: "Resolved" },
];

export const LEAD_STATUSES: { id: LeadStatus; label: string }[] = [
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "qualified", label: "Qualified" },
  { id: "converted", label: "Converted" },
  { id: "lost", label: "Lost" },
];

export const PRIORITIES: { id: Priority; label: string }[] = [
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
];

export const BOOKING_STATUSES: { id: BookingStatus; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "cancelled", label: "Cancelled" },
];

// One message in the live demo chat. "by" tells AI replies and manual team replies apart.
export type LiveMsg = {
  role: "user" | "assistant" | "system";
  content: string;
  at: number;
  by?: "ai" | "owner";
};

export type SampleMsg = { from: "customer" | "ai" | "owner"; text: string; time: string };
export type SampleConv = {
  id: string;
  name: string;
  time: string;
  status: ConvStatus;
  assignee: string; // "" = unassigned
  messages: SampleMsg[];
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  need: string;
  status: LeadStatus;
  priority: Priority;
  notes: string;
  followUp: string; // yyyy-mm-dd or ""
  fromChat: boolean; // true = captured from the live demo chat
};

export type Booking = {
  id: string;
  name: string;
  detail: string; // party size, treatment, service or listing
  slot: string;
  resource: string; // table, dentist, stylist or agent
  status: BookingStatus;
};

export type NicheExtras = {
  team: string[];
  conversations: SampleConv[];
  leads: Lead[];
  bookings: Booking[];
  manage: {
    bookingsTitle: string; // tab name, e.g. "Reservations"
    addLabel: string; // e.g. "Add reservation"
    resourceLabel: string; // e.g. "Table"
    resources: string[];
    detailLabel: string; // e.g. "Party size"
    detailOptions?: string[]; // fixed options; otherwise the niche's own items are used
    slots: string[]; // chronological order
  };
  insights: { topQuestions: string[]; unanswered: string[] };
  safetyNote?: string;
};

// A date relative to today as yyyy-mm-dd (used for follow-up reminders).
export function dayOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function todayISO(): string {
  return dayOffset(0);
}

export function fmtTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const c = (text: string, time: string): SampleMsg => ({ from: "customer", text, time });
const a = (text: string, time: string): SampleMsg => ({ from: "ai", text, time });

function lead(
  id: string,
  name: string,
  phone: string,
  need: string,
  status: LeadStatus,
  priority: Priority,
  followUpDays: number | null,
  notes = ""
): Lead {
  return {
    id,
    name,
    phone,
    need,
    status,
    priority,
    notes,
    followUp: followUpDays === null ? "" : dayOffset(followUpDays),
    fromChat: false,
  };
}

function booking(
  id: string,
  name: string,
  detail: string,
  slot: string,
  resource: string,
  status: BookingStatus
): Booking {
  return { id, name, detail, slot, resource, status };
}

export const NICHE_EXTRAS: Record<DemoNicheId, NicheExtras> = {
  restaurant: {
    team: ["Layla", "Omar"],
    conversations: [
      {
        id: "r1",
        name: "Sara M.",
        time: "09:12",
        status: "resolved",
        assignee: "Layla",
        messages: [
          c("Hi, do you have a table for 4 tonight at 8?", "09:10"),
          a("Yes, we can seat 4 at 20:00. Could I take your name and phone number?", "09:10"),
          c("Sara, 050 000 1111", "09:11"),
          a("Thanks Sara! The team will confirm your table shortly.", "09:12"),
        ],
      },
      {
        id: "r2",
        name: "Ahmed K.",
        time: "10:03",
        status: "open",
        assignee: "",
        messages: [
          c("Is the mezze platter halal and nut free?", "10:02"),
          a(
            "Everything is halal certified. For nut allergies, the team will check with the kitchen so we can be sure.",
            "10:03"
          ),
        ],
      },
      {
        id: "r3",
        name: "Julia P.",
        time: "11:40",
        status: "waiting",
        assignee: "Omar",
        messages: [
          c("Can I get delivery to Al Barsha?", "11:38"),
          a("Delivery covers 8 km, 30 to 45 minutes. Could you share your address so the team can check?", "11:39"),
        ],
      },
    ],
    leads: [
      lead("rl1", "Sara M.", "+971 50 000 1111", "Table for 4, tonight 20:00", "converted", "medium", null),
      lead("rl2", "Khalid R.", "+971 50 000 1122", "Birthday dinner for 12 guests", "qualified", "high", 1, "Needs a call, group is over 10"),
      lead("rl3", "Mina T.", "+971 55 000 2233", "Catering for office lunch", "new", "medium", 0),
      lead("rl4", "Peter W.", "+971 52 000 3344", "Pickup order, vegan options", "contacted", "low", 2),
      lead("rl5", "Aisha N.", "+971 54 000 4455", "Anniversary table, window seat", "lost", "low", null),
    ],
    bookings: [
      booking("rb1", "Sara M.", "4 guests", "Today 20:00", "Table 2", "confirmed"),
      booking("rb2", "Khalid R.", "8 guests", "Tomorrow 20:00", "Table 4", "pending"),
      booking("rb3", "Peter W.", "2 guests", "Today 19:00", "Table 1", "pending"),
    ],
    manage: {
      bookingsTitle: "Reservations",
      addLabel: "Add reservation",
      resourceLabel: "Table",
      resources: ["Table 1", "Table 2", "Table 3", "Table 4"],
      detailLabel: "Party size",
      detailOptions: ["2 guests", "4 guests", "6 guests", "8 guests"],
      slots: ["Today 19:00", "Today 20:00", "Today 21:00", "Tomorrow 13:00", "Tomorrow 20:00"],
    },
    insights: {
      topQuestions: ["Do you have vegan dishes?", "Can I book for 6 tonight?", "Do you deliver to my area?"],
      unanswered: ["Do you have a kids menu?", "Can you host a private event?", "Is there outdoor seating?"],
    },
    safetyNote:
      "For allergy questions the bot only shares the dietary info you entered. Anything else goes to staff to check with the kitchen.",
  },

  clinic: {
    team: ["Front desk", "Dr. Aisha"],
    conversations: [
      {
        id: "c1",
        name: "Fatima R.",
        time: "08:45",
        status: "resolved",
        assignee: "Front desk",
        messages: [
          c("How much is teeth whitening?", "08:44"),
          a("Teeth whitening is 800 AED. Would you like to book an appointment?", "08:44"),
          c("Yes, Thursday morning please", "08:45"),
          a("Great! Could I take your name and phone number so the team can confirm?", "08:45"),
        ],
      },
      {
        id: "c2",
        name: "Mohammed S.",
        time: "10:20",
        status: "open",
        assignee: "",
        messages: [
          c("I have a lot of pain and my cheek is swollen", "10:19"),
          a(
            "I'm sorry you're in pain. I can't diagnose, but this should be seen urgently. Please call our 24/7 emergency line now. I'm alerting the clinic team too.",
            "10:19"
          ),
        ],
      },
      {
        id: "c3",
        name: "Anna L.",
        time: "12:05",
        status: "waiting",
        assignee: "Dr. Aisha",
        messages: [
          c("Are you accepting new patients?", "12:04"),
          a("Yes, we are. Could I take your name and the day that suits you?", "12:05"),
        ],
      },
    ],
    leads: [
      lead("cl1", "Fatima R.", "+971 50 000 5511", "Teeth whitening, Thursday morning", "qualified", "medium", 1),
      lead("cl2", "Mohammed S.", "+971 55 000 5522", "Urgent: pain and swelling", "contacted", "high", 0, "Sent to emergency line"),
      lead("cl3", "Anna L.", "+971 52 000 5533", "New patient check-up", "new", "medium", 0),
      lead("cl4", "Rashid B.", "+971 54 000 5544", "Braces consultation (free)", "new", "low", 2),
      lead("cl5", "Lina G.", "+971 56 000 5555", "Root canal quote", "converted", "medium", null),
    ],
    bookings: [
      booking("cb1", "Fatima R.", "Teeth whitening", "Tomorrow 09:30", "Dr. Aisha", "pending"),
      booking("cb2", "Lina G.", "Root canal (from)", "Today 11:30", "Dr. Imran", "confirmed"),
      booking("cb3", "Anna L.", "Check-up and cleaning", "Today 15:00", "Dr. Chen", "pending"),
    ],
    manage: {
      bookingsTitle: "Appointments",
      addLabel: "Add appointment",
      resourceLabel: "Dentist",
      resources: ["Dr. Aisha", "Dr. Imran", "Dr. Chen"],
      detailLabel: "Treatment",
      slots: ["Today 10:00", "Today 11:30", "Today 15:00", "Tomorrow 09:30", "Tomorrow 16:00"],
    },
    insights: {
      topQuestions: ["How much is teeth whitening?", "Do you take my insurance?", "Are you open on Friday?"],
      unanswered: ["Do you offer Invisalign?", "Is there a student discount?", "Do you treat children under 5?"],
    },
    safetyNote:
      "The bot never diagnoses. If a patient describes pain or swelling it points them to your emergency line and flags the chat in Inbox.",
  },

  salon: {
    team: ["Reception", "Hana"],
    conversations: [
      {
        id: "s1",
        name: "Noor A.",
        time: "09:30",
        status: "open",
        assignee: "Reception",
        messages: [
          c("Do you do bridal makeup in 3 weeks?", "09:29"),
          a("Yes! Bridal bookings need 2 weeks' notice and include a trial. Could I take your name and phone?", "09:30"),
        ],
      },
      {
        id: "s2",
        name: "Hiba T.",
        time: "11:15",
        status: "resolved",
        assignee: "",
        messages: [
          c("Can I come for a haircut now?", "11:14"),
          a("Walk-ins are welcome, subject to availability. A haircut is 90 AED.", "11:15"),
        ],
      },
      {
        id: "s3",
        name: "Maya D.",
        time: "13:50",
        status: "waiting",
        assignee: "Hana",
        messages: [
          c("I need to cancel tomorrow's appointment", "13:48"),
          a("No problem. Cancellation is free up to 12 hours before. Could you share your name and the time?", "13:49"),
        ],
      },
    ],
    leads: [
      lead("sl1", "Noor A.", "+971 50 000 6611", "Bridal makeup with trial", "qualified", "high", 1, "Wedding in 3 weeks"),
      lead("sl2", "Hiba T.", "+971 55 000 6622", "Haircut and colour", "converted", "low", null),
      lead("sl3", "Reem F.", "+971 52 000 6633", "Keratin treatment quote", "new", "medium", 0),
      lead("sl4", "Sana Q.", "+971 54 000 6644", "Facial and manicure package", "contacted", "medium", 2),
      lead("sl5", "Dina O.", "+971 56 000 6655", "Hair colour, Saturday", "lost", "low", null),
    ],
    bookings: [
      booking("sb1", "Hiba T.", "Haircut", "Today 12:00", "Hana", "confirmed"),
      booking("sb2", "Noor A.", "Bridal makeup (from)", "Tomorrow 11:00", "Mariam", "pending"),
      booking("sb3", "Maya D.", "Facial", "Tomorrow 15:30", "Zoya", "pending"),
    ],
    manage: {
      bookingsTitle: "Appointments",
      addLabel: "Add appointment",
      resourceLabel: "Stylist",
      resources: ["Hana", "Mariam", "Zoya"],
      detailLabel: "Service",
      slots: ["Today 12:00", "Today 14:00", "Today 17:00", "Tomorrow 11:00", "Tomorrow 15:30"],
    },
    insights: {
      topQuestions: ["How much is bridal makeup?", "Are you free on Saturday?", "Do you do keratin?"],
      unanswered: ["Do you offer hair extensions?", "Can I bring my own products?", "Do you do men's haircuts?"],
    },
  },

  realestate: {
    team: ["Agent Karim", "Agent Dana"],
    conversations: [
      {
        id: "e1",
        name: "Omar H.",
        time: "09:05",
        status: "open",
        assignee: "Agent Karim",
        messages: [
          c("Is the 1-bed in the Marina still available?", "09:04"),
          a("Yes, it is 95,000 AED per year. Would you like to book a free viewing?", "09:05"),
        ],
      },
      {
        id: "e2",
        name: "Elena V.",
        time: "10:40",
        status: "open",
        assignee: "",
        messages: [
          c("I want to buy a villa. Can I get a mortgage as a non-resident?", "10:38"),
          a("Mortgage help is available for residents and non-residents. Shall an agent call you? I'd need your name and phone.", "10:39"),
        ],
      },
      {
        id: "e3",
        name: "Bilal Q.",
        time: "14:15",
        status: "resolved",
        assignee: "Agent Dana",
        messages: [
          c("Can I view a townhouse on Saturday?", "14:12"),
          a("Viewings are free and take about 30 minutes. An agent will confirm by WhatsApp.", "14:13"),
        ],
      },
    ],
    leads: [
      lead("el1", "Omar H.", "+971 50 000 7711", "1-bed Marina, yearly rent", "contacted", "high", 0),
      lead("el2", "Elena V.", "+971 55 000 7722", "Buy a villa, non-resident mortgage", "new", "high", 0, "Budget about 6M AED"),
      lead("el3", "Bilal Q.", "+971 52 000 7733", "3-bed townhouse viewing", "qualified", "medium", 1),
      lead("el4", "Tariq S.", "+971 54 000 7744", "Studio JLT for rent", "converted", "low", null),
      lead("el5", "Olga M.", "+971 56 000 7755", "Free valuation of her flat", "new", "medium", 3),
    ],
    bookings: [
      booking("eb1", "Bilal Q.", "3-bed townhouse, Arabian Ranches", "Sat 11:00", "Agent Dana", "confirmed"),
      booking("eb2", "Omar H.", "1-bed apartment, Dubai Marina", "Today 17:30", "Agent Karim", "pending"),
      booking("eb3", "Elena V.", "4-bed villa, Dubai Hills", "Tomorrow 14:00", "Agent Ravi", "pending"),
    ],
    manage: {
      bookingsTitle: "Viewings",
      addLabel: "Add viewing",
      resourceLabel: "Agent",
      resources: ["Agent Karim", "Agent Dana", "Agent Ravi"],
      detailLabel: "Listing",
      slots: ["Today 16:00", "Today 17:30", "Tomorrow 10:00", "Tomorrow 14:00", "Sat 11:00"],
    },
    insights: {
      topQuestions: ["Is the 1-bed still available?", "What are the agency fees?", "Can foreigners buy here?"],
      unanswered: ["Do you manage short-term rentals?", "Are pets allowed in the Marina flat?", "Can I pay rent monthly?"],
    },
  },
};

// Per-niche copy of the sample data. Panels edit this copy, so a reset brings the originals back.
export type DemoExtras = {
  conversations: SampleConv[];
  liveStatus: ConvStatus;
  liveAssignee: string;
  leads: Lead[];
  bookings: Booking[];
};

export function initialExtras(id: DemoNicheId): DemoExtras {
  const n = NICHE_EXTRAS[id];
  return {
    conversations: n.conversations.map((x) => ({ ...x })),
    liveStatus: "open",
    liveAssignee: "",
    leads: n.leads.map((x) => ({ ...x })),
    bookings: n.bookings.map((x) => ({ ...x })),
  };
}

// --- helpers -------------------------------------------------------------------------------

export function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

// Spreadsheet apps run text that starts with = + - @ as a formula, so prefix those cells.
function csvCell(v: string): string {
  const safe = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function leadsToCsv(leads: Lead[]): string {
  const head = ["Name", "Phone", "Requirement", "Status", "Priority", "Follow-up date", "Notes", "Source"];
  const rows = leads.map((l) => [
    l.name,
    l.phone,
    l.need,
    LEAD_STATUSES.find((s) => s.id === l.status)?.label ?? l.status,
    PRIORITIES.find((p) => p.id === l.priority)?.label ?? l.priority,
    l.followUp,
    l.notes,
    l.fromChat ? "Live chat" : "Sample",
  ]);
  return [head, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n");
}

export function downloadText(filename: string, text: string, mime = "text/csv;charset=utf-8") {
  const blob = new Blob(["\ufeff" + text], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Looks for a phone number in free text (7 to 15 digits).
export function findPhone(text: string): string | null {
  const m = text.match(/\+?\d[\d\s().-]{5,}\d/);
  if (!m) return null;
  const digits = digitsOnly(m[0]);
  return digits.length >= 7 && digits.length <= 15 ? m[0].trim() : null;
}

// Did the visitor ask for a real person?
const HANDOFF_RE =
  /\b(human|real person|live agent|representative|manager|talk to|speak (to|with)|call me)\b|موظف|شخص حقيقي|إنسان|انسان|مدير/i;
export function wantsHuman(text: string): boolean {
  return HANDOFF_RE.test(text);
}
