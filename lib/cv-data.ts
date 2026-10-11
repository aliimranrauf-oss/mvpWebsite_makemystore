// Content for /cv-writing. Edit prices, features and FAQs here only.
//
// PRICING NOTE: the only confirmed figure is "from £40". Replace the
// "Custom quote" placeholders below with your real starting prices
// (e.g. "From £75") whenever you're ready — the page updates automatically.

export type CvPackage = {
  id: string; // used as the form's package value + data-package attribute
  name: string;
  price: string;
  priceNote: string;
  tagline: string;
  bestFor: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
};

export const cvPackages: CvPackage[] = [
  {
    id: "cv-cover-letter",
    name: "CV & Cover Letter",
    price: "From £40",
    priceNote: "Cover letter included free",
    tagline: "A sharp, ATS-ready CV and a tailored cover letter.",
    bestFor: "Professionals applying for a specific role or switching employers.",
    features: [
      "Professionally written, ATS-friendly CV",
      "Tailored cover letter — included at no extra charge",
      "Matched to your industry and target role",
      "Free interview follow-up email",
      "11 months of free revisions",
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn Profile",
    price: "Quote on request",
    priceNote: "Fixed price confirmed before we start",
    tagline: "A keyword-rich profile that recruiters in the Gulf actually find.",
    bestFor: "Anyone being headhunted — or who wants to be.",
    features: [
      "SEO-optimised headline and About section",
      "Experience and skills rewritten for recruiter search",
      "Professional, credible tone — no buzzword filler",
      "Guidance on photo, banner and URL",
      "11 months of free revisions",
    ],
  },
  {
    id: "complete",
    name: "Complete Package",
    price: "Quote on request",
    priceNote: "Best value — bundled saving",
    tagline: "CV, cover letter and LinkedIn, all telling the same strong story.",
    bestFor: "Career moves, relocations and senior or executive applications.",
    features: [
      "Everything in CV & Cover Letter",
      "Full LinkedIn profile optimisation",
      "Consistent personal brand across every document",
      "Free interview follow-up email",
      "11 months of free revisions",
      "Biography add-on available",
    ],
    highlight: true,
    badge: "Most popular",
  },
  {
    id: "biography",
    name: "Professional Biography",
    price: "Quote on request",
    priceNote: "Short, medium or long form",
    tagline: "A polished bio for your website, speaking, board or press needs.",
    bestFor: "Executives, consultants, founders, speakers and board candidates.",
    features: [
      "Written in first or third person",
      "Versions for web, conferences and company profiles",
      "Highlights achievements and authority",
      "Tone matched to your audience",
      "11 months of free revisions",
    ],
  },
];

export const cvIncluded = [
  {
    title: "Industry-matched writers",
    desc: "Your CV is written by a professional who understands your field, so the language reads like an insider's.",
  },
  {
    title: "ATS-friendly formatting",
    desc: "Clean structure and the right keywords so applicant tracking systems pass you through to a human.",
  },
  {
    title: "Free cover letter",
    desc: "Included with CV packages at no extra charge, tailored to the role you are targeting.",
  },
  {
    title: "11 months of free revisions",
    desc: "New job, new certification, new achievement? Send updates and we refresh your documents free.",
  },
  {
    title: "Free interview follow-up email",
    desc: "A ready-to-send thank-you email that keeps you memorable after the interview.",
  },
  {
    title: "24/7 live chat support",
    desc: "Questions at any hour, from any time zone — ask and we will get back to you.",
  },
];

export const gulfPoints = [
  {
    title: "Written for GCC recruiters",
    desc: "We structure your CV around what hiring managers in Riyadh, Dubai, Abu Dhabi, Doha and Kuwait City scan for first: scope, results and regional relevance.",
  },
  {
    title: "Gulf-specific details handled",
    desc: "Nationality, visa or residency status, notice period, languages and driving licence — included where they help, left out where they do not.",
  },
  {
    title: "Vision 2030 and giga-project ready",
    desc: "Position your experience for the Kingdom's fast-growing sectors: construction and infrastructure, energy, tourism, healthcare, technology and finance.",
  },
  {
    title: "Relocating or expat? We get it",
    desc: "Translate overseas experience, qualifications and employers into terms Gulf recruiters recognise and trust.",
  },
];

export const gulfMarkets = [
  "Saudi Arabia (KSA)",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
];

export const cvSteps = [
  {
    title: "Send your details",
    desc: "Choose a package and fill in the short form below. Tell us the role, industry and country you are targeting.",
  },
  {
    title: "Get your exact quote",
    desc: "We reply with a fixed price and timeline before you pay anything.",
  },
  {
    title: "Share your current CV",
    desc: "Send your existing CV or career notes. We may ask a few quick questions to capture your wins.",
  },
  {
    title: "Review and refine",
    desc: "Receive your documents on time, request edits, and enjoy 11 months of free revisions.",
  },
];

export const cvFaqs = [
  {
    q: "How much does a CV writing package cost?",
    a: "Our CV and cover letter packages start from £40. LinkedIn, Complete and Biography packages are quoted individually depending on seniority and scope. Submit the form on this page and you will receive an exact fixed price before any work starts.",
  },
  {
    q: "Is the cover letter really free?",
    a: "Yes. A tailored cover letter is included at no extra charge with our CV packages.",
  },
  {
    q: "Will my CV suit Saudi Arabia, UAE and the wider Gulf?",
    a: "Yes. We write for Gulf recruiters and employers, covering regional conventions such as nationality, visa status and notice period where they help your application, and positioning your experience for GCC sectors.",
  },
  {
    q: "Is the CV ATS-friendly?",
    a: "Yes. Every CV is formatted to pass applicant tracking systems and uses keywords from your target role and industry.",
  },
  {
    q: "What are the free revisions?",
    a: "You get 11 months of free revisions. If your experience, role or goals change, send us the updates and we will refresh your documents at no cost.",
  },
  {
    q: "Do you write academic CVs?",
    a: "Yes. We write academic CVs covering research, publications, teaching, grants and conferences, alongside standard professional CVs.",
  },
  {
    q: "How long does delivery take?",
    a: "Timelines depend on the package and how quickly you share your information. We confirm a delivery date in your quote, and we deliver on time.",
  },
  {
    q: "How do I pay, and in what currency?",
    a: "Prices are listed in GBP. Tell us your preferred currency (SAR, AED, USD and so on) in the form and we will confirm the equivalent and payment options in your quote.",
  },
  {
    q: "Can I see samples?",
    a: "Yes. Tick the sample request option on the form and we will send you CV samples relevant to your industry.",
  },
];
