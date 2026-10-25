/** Free browser-only tools. They run on the visitor's device: no API, no server cost. */
export type Tool = {
  slug: string; name: string; h1: string; title: string; description: string;
  keywords: string[]; intro: string; steps: string[];
  faqs: { q: string; a: string }[];
  cta: { text: string; href: string; label: string };
};
const POS = { text: "Need a full POS or billing system for your shop?", href: "/pos-system", label: "See our POS systems" };
const BOT = { text: "Want an AI chatbot answering customers 24/7?", href: "/ai-chatbot", label: "See our AI chatbots" };
const CV = { text: "Want a recruiter-ready CV written for you?", href: "/cv-writing", label: "See CV writing service" };
const MVP = { text: "Planning an online store or SaaS?", href: "/saas-mvp", label: "See our SaaS MVP service" };

export const tools: Tool[] = [
  { slug: "invoice-generator", name: "Invoice Generator", h1: "Free Invoice Generator: Create & Download PDF Invoices",
    title: "Free Invoice Generator: Create a PDF Invoice Online | MakeMyStore",
    description: "Make a professional invoice in seconds. Free, no sign-up, works in any currency. Add items and tax, then download as PDF.",
    keywords: ["free invoice generator", "invoice maker online", "create invoice pdf", "receipt generator", "invoice template"],
    intro: "Freelancers and small shops need clean invoices without paying for accounting software. Fill in your details, add line items, and the totals and tax are calculated for you. Press Download PDF to save it. Nothing is uploaded: your data stays in your browser.",
    steps: ["Enter your business and client details.", "Add line items with quantity and price, then set the tax rate.", "Click Download PDF and choose Save as PDF."],
    faqs: [{ q: "Is this invoice generator really free?", a: "Yes. There is no sign-up, watermark or limit." }, { q: "Is my data stored?", a: "No. Everything is processed in your browser and never sent to a server." }, { q: "Can I use any currency?", a: "Yes. Type any currency symbol, such as £, $, AED or Rs." }], cta: POS },
  { slug: "profit-margin-calculator", name: "Profit Margin Calculator", h1: "Profit Margin & Markup Calculator for Online Sellers",
    title: "Profit Margin Calculator: Margin, Markup & Pricing | MakeMyStore",
    description: "Free profit margin calculator for online stores. Enter cost, fees and shipping to see profit, margin and markup, and the price you need for a target margin.",
    keywords: ["profit margin calculator", "markup calculator", "ecommerce pricing calculator", "selling price calculator"],
    intro: "Margin is profit divided by selling price. Markup is profit divided by cost. Mixing them up is the most common pricing mistake in online stores. This calculator includes payment fees and shipping so you see real profit, and tells you the price needed to hit your target margin.",
    steps: ["Enter your product cost and selling price.", "Add marketplace or payment fee percentage and shipping cost.", "Read your profit, margin and markup, and set a target margin to get a recommended price."],
    faqs: [{ q: "What is a good profit margin for ecommerce?", a: "Many stores aim for 30 to 50 percent gross margin, but it depends on the product and ad costs." }, { q: "What is the difference between margin and markup?", a: "Margin is profit as a share of price. Markup is profit as a share of cost, so markup is always higher." }, { q: "Does it include fees?", a: "Yes, enter a fee percentage and a fixed shipping cost." }], cta: MVP },
  { slug: "qr-code-generator", name: "QR Code Generator", h1: "Free QR Code Generator: Links, Text, WhatsApp & Menus",
    title: "Free QR Code Generator: Create & Download PNG | MakeMyStore",
    description: "Create a QR code for any link, text or WhatsApp number. Free, unlimited, no sign-up. Download as a high-quality PNG.",
    keywords: ["qr code generator", "free qr code", "whatsapp qr code", "menu qr code", "url to qr code"],
    intro: "QR codes connect printed material to the web: restaurant menus, shop windows, business cards and payment links. Paste a link or text and your code appears instantly. These codes never expire and have no tracking redirect.",
    steps: ["Paste a URL, text, or a wa.me WhatsApp link.", "Choose the size.", "Click Download PNG and print or share it."],
    faqs: [{ q: "Do these QR codes expire?", a: "No. The code holds your data directly, so it works forever." }, { q: "Can I make a WhatsApp QR code?", a: "Yes. Use a link like https://wa.me/447700900123." }, { q: "Is it free for commercial use?", a: "Yes, use them on menus, packaging and flyers." }], cta: POS },
  { slug: "cv-builder", name: "Free CV Builder", h1: "Free CV Builder: Make a Clean Resume & Download as PDF",
    title: "Free CV & Resume Builder: Download PDF, No Sign-up | MakeMyStore",
    description: "Build an ATS-friendly CV online for free. Fill in the form, preview live and save as PDF. Nothing is stored.",
    keywords: ["free cv builder", "resume builder", "ats friendly cv", "cv maker pdf", "online resume maker"],
    intro: "Recruiters and applicant tracking systems prefer a simple, single-column layout. This builder produces exactly that: clear headings, readable fonts and no tables or graphics that confuse parsers. Add your details, check the live preview and save as PDF.",
    steps: ["Fill in your name, contact details and summary.", "Add experience, education and skills, one item per line.", "Click Download PDF."],
    faqs: [{ q: "Is the CV ATS friendly?", a: "Yes. It uses a single column with standard headings." }, { q: "Is my information saved?", a: "No. It stays in your browser." }, { q: "Can someone write it for me?", a: "Yes, our CV writing service creates tailored CVs and LinkedIn profiles." }], cta: CV },
  { slug: "business-name-generator", name: "Business Name Generator", h1: "Business & Store Name Generator: Get Brandable Ideas",
    title: "Free Business Name Generator for Stores & Startups | MakeMyStore",
    description: "Generate brandable business and online store name ideas from your keyword. Free and instant, with tips for choosing a name.",
    keywords: ["business name generator", "store name ideas", "brand name generator", "startup name generator"],
    intro: "A good name is short, easy to spell and available as a domain. Enter a keyword about your product and get combinations to shortlist. Check the domain and social handles before you commit.",
    steps: ["Type a keyword such as coffee, fashion or tech.", "Click Generate for new ideas.", "Shortlist names and check domain availability."],
    faqs: [{ q: "How should I choose a store name?", a: "Keep it under 3 syllables or 12 characters, easy to spell, and not tied to one product." }, { q: "Do I need a .com?", a: "It helps globally, but a local domain can be better for local businesses." }, { q: "Are generated names trademark safe?", a: "Not guaranteed. Search trademark databases before registering." }], cta: MVP },
  { slug: "currency-converter", name: "Currency Converter", h1: "Currency Converter: Live Exchange Rates for 150+ Currencies",
    title: "Currency Converter: Live Exchange Rates | MakeMyStore",
    description: "Convert between USD, GBP, EUR, AED, PKR and 150+ currencies with daily exchange rates. Fast and free.",
    keywords: ["currency converter", "exchange rate calculator", "usd to pkr", "gbp to usd", "aed converter"],
    intro: "Selling globally means pricing in several currencies. This converter uses daily mid-market rates, which are handy for planning prices and quotes. Actual bank or payment-provider rates will differ slightly.",
    steps: ["Enter an amount.", "Pick the from and to currencies.", "Read the converted amount."],
    faqs: [{ q: "How often are rates updated?", a: "Rates update about once a day." }, { q: "Are these the rates my bank gives?", a: "No. Banks add a margin, so treat these as a guide." }, { q: "Which currencies are supported?", a: "More than 150, including USD, GBP, EUR, AED, AUD and PKR." }], cta: MVP },
  { slug: "chatbot-roi-calculator", name: "Chatbot ROI Calculator", h1: "AI Chatbot ROI Calculator: How Much Can You Save?",
    title: "AI Chatbot ROI Calculator: Estimate Monthly Savings | MakeMyStore",
    description: "Estimate how many staff hours and how much money an AI chatbot could save your business each month.",
    keywords: ["chatbot roi calculator", "ai chatbot cost savings", "customer support cost calculator"],
    intro: "Most customer questions are repeats: opening hours, prices, delivery and bookings. A chatbot can answer these instantly at any hour. Enter your numbers for a realistic estimate of the time and money freed up.",
    steps: ["Enter monthly customer chats and average minutes per chat.", "Enter staff hourly cost and the share a bot could handle.", "Add the bot's monthly cost to see net savings."],
    faqs: [{ q: "What share can a chatbot handle?", a: "Typically 50 to 80 percent of routine questions." }, { q: "Is this a guarantee?", a: "No. It is an estimate based on your inputs." }, { q: "How do I get a chatbot?", a: "We build and host AI chatbots for WhatsApp and websites." }], cta: BOT },
  { slug: "image-compressor", name: "Image Compressor", h1: "Free Image Compressor: Reduce JPG & PNG Size Online",
    title: "Free Image Compressor: Shrink Photos Without Upload | MakeMyStore",
    description: "Compress images in your browser. Smaller files make your store load faster. No upload, no limits.",
    keywords: ["image compressor", "compress jpg", "reduce image size", "optimize images for website"],
    intro: "Large product photos are the top reason online stores load slowly. This tool compresses images on your own device, so your photos are never uploaded anywhere. Pick a quality level and download the smaller file.",
    steps: ["Choose an image.", "Adjust the quality slider.", "Compare sizes and download."],
    faqs: [{ q: "Are my photos uploaded?", a: "No. Compression happens in your browser." }, { q: "What quality should I use?", a: "70 to 80 percent usually looks identical and saves a lot of space." }, { q: "Which formats work?", a: "JPG, PNG and WebP inputs. Output is JPG." }], cta: MVP },
];
export const getTool = (s: string) => tools.find((t) => t.slug === s);
