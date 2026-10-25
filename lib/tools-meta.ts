export const categories = ["All", "Ecommerce", "Business", "Marketing", "Design", "Career", "Utilities"] as const;
export type Category = Exclude<(typeof categories)[number], "All">;
/** Display data for the /tools directory. Icons are lucide-react names (see ToolsDirectory). */
export const toolMeta: Record<string, { cat: Category; icon: string; tags: string[] }> = {
  "invoice-generator": { cat: "Business", icon: "FileText", tags: ["PDF", "Invoices", "Tax"] },
  "profit-margin-calculator": { cat: "Ecommerce", icon: "Calculator", tags: ["Profit", "Pricing", "Markup"] },
  "qr-code-generator": { cat: "Utilities", icon: "QrCode", tags: ["QR", "Link", "WhatsApp"] },
  "cv-builder": { cat: "Career", icon: "Briefcase", tags: ["CV", "ATS", "PDF"] },
  "business-name-generator": { cat: "Marketing", icon: "Lightbulb", tags: ["Branding", "Ideas"] },
  "currency-converter": { cat: "Utilities", icon: "ArrowLeftRight", tags: ["USD", "GBP", "PKR"] },
  "chatbot-roi-calculator": { cat: "Business", icon: "Bot", tags: ["Savings", "ROI"] },
  "image-compressor": { cat: "Design", icon: "Image", tags: ["JPG", "PNG", "WebP"] },
  "shopify-fee-calculator": { cat: "Ecommerce", icon: "Store", tags: ["Fees", "Profit"] },
  "cod-profit-calculator": { cat: "Ecommerce", icon: "Truck", tags: ["COD", "Returns"] },
  "meta-description-generator": { cat: "Marketing", icon: "Search", tags: ["SEO", "Snippet"] },
  "freelance-rate-calculator": { cat: "Career", icon: "Wallet", tags: ["Hourly", "Tax"] },
};
export const featuredSlugs = ["profit-margin-calculator", "invoice-generator", "shopify-fee-calculator"];
/** Free tools shown on each service page. */
export const serviceTools: Record<string, string[]> = {
  "ai-chatbot": ["chatbot-roi-calculator", "cod-profit-calculator", "qr-code-generator"],
  "pos-system": ["invoice-generator", "profit-margin-calculator", "qr-code-generator", "cod-profit-calculator"],
  "cv-writing": ["cv-builder", "freelance-rate-calculator"],
  "saas-mvp": ["shopify-fee-calculator", "meta-description-generator", "profit-margin-calculator", "image-compressor"],
  "project-rescue": ["image-compressor", "meta-description-generator"],
};
