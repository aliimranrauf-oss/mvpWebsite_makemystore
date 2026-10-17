// Content for /cv-writing in English (default) and Arabic.
// Edit prices, features and FAQs here only. Keep both languages in the same order.
//
// PRICING: every package has a FIXED GBP price per career level (see `prices`).
// Change a number once here and the page, order form, JSON-LD, Instant Answers
// bot and AI chatbot all update. Portfolio Website is a single flat price —
// the £350 figure is a placeholder, set the real one in `prices` below.

export type Lang = "en" | "ar";

export type LevelId = "entry" | "professional" | "senior" | "executive";
export const LEVEL_IDS: LevelId[] = ["entry", "professional", "senior", "executive"];

export type LevelInfo = { id: LevelId; label: string; years: string; blurb: string };

export type CvPackage = {
  id: string; // sent to the form + data-package attribute (never translated)
  name: string;
  /** Fixed GBP price for each career level. */
  prices: Record<LevelId, number>;
  /** Levels this package is sold at (default: all four). */
  levels?: LevelId[];
  /** Same price at every level (Portfolio Website). */
  flat?: boolean;
  priceNote: string;
  tagline: string;
  bestFor: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
};

type Pair = { title: string; desc: string };
type FaqItem = { q: string; a: string };
type Opt = { value: string; label: string };

export type Content = {
  hero: { eyebrow: string; title: string; desc: string; primary: string; secondary: string };
  stats: { label: string; value: string }[];
  packages: {
    title: string;
    intro: string;
    choose: string;
    orderNow: string;
    bestFor: string;
    levelsTitle: string;
    levels: LevelInfo[];
    groupIncludes: string;
    onlyFrom: string;
    fixedBadge: string;
    academicBold: string;
    academicText: string;
    items: CvPackage[];
  };
  gulf: { badge: string; title: string; intro: string; points: Pair[]; markets: string[] };
  portfolio: { badge: string; title: string; intro: string; points: string[]; imageAlt: string; cta: string };
  included: { title: string; intro: string; items: Pair[] };
  how: { title: string; intro: string; steps: Pair[] };
  order: { title: string; intro: string; bullets: string[] };
  faq: { title: string; items: FaqItem[] };
  cta: { title: string; desc: string; button: string };
  form: {
    package: string;
    name: string;
    email: string;
    phone: string;
    phoneHint: string;
    country: string;
    level: string;
    deadline: string;
    role: string;
    rolePlaceholder: string;
    currency: string;
    yourPrice: string;
    fixedPriceNote: string;
    levelAdjusted: string;
    optional: string;
    noPreference: string;
    notes: string;
    notesPlaceholder: string;
    samples: string;
    submit: string;
    sending: string;
    note: string;
    successTitle: string;
    successBody: string;
    again: string;
    errName: string;
    errEmail: string;
    errEmailInvalid: string;
    errRole: string;
    errGeneric: string;
    errNetwork: string;
    countries: Opt[];
    levels: Opt[];
    deadlines: Opt[];
  };
};

const en: Content = {
  hero: {
    eyebrow: "CV, LinkedIn & Career Documents",
    title: "A CV that opens doors across Saudi Arabia, the UAE and the Gulf",
    desc: "Professional CV, cover letter, LinkedIn and biography writing for ambitious candidates targeting the GCC. ATS-ready, industry-matched and backed by 11 months of free revisions.",
    primary: "Order now",
    secondary: "See fixed prices",
  },
  stats: [
    { label: "Cover letter", value: "Free" },
    { label: "Free revisions", value: "11 months" },
    { label: "Packages from", value: "£100" },
    { label: "Live chat", value: "24/7" },
  ],
  packages: {
    title: "Packages built around your career goals",
    intro:
      "Pick your career level and see the fixed price. Every package includes free revisions, and the price you see is the price you pay.",
    choose: "Choose this package",
    orderNow: "Order now",
    bestFor: "Best for:",
    levelsTitle: "Career level",
    levels: [
      { id: "entry", label: "Entry / Fresh", years: "0–2 years", blurb: "Graduates and early-career candidates starting out in the Gulf job market." },
      { id: "professional", label: "Professional", years: "2–5 years", blurb: "Established professionals ready for the next step up." },
      { id: "senior", label: "Senior", years: "5–10 years", blurb: "Team leaders, managers and specialists going for senior roles." },
      { id: "executive", label: "Executive", years: "10+ years", blurb: "Directors, C-level leaders and founders targeting top-tier positions." },
    ],
    groupIncludes: "Every level includes",
    onlyFrom: "Biographies are written for Senior and Executive profiles.",
    fixedBadge: "Fixed price",
    academicBold: "Also available:",
    academicText:
      "Academic CV writing for researchers and lecturers, covering publications, grants, teaching and conferences. Choose the level closest to your career stage and mention it in the order form.",
    items: [
      {
        id: "cv-cover-letter",
        name: "CV & Cover Letter",
        prices: { entry: 150, professional: 200, senior: 250, executive: 300 },
        priceNote: "Cover letter included free",
        tagline: "A sharp, ATS-ready CV and a tailored cover letter.",
        bestFor: "Professionals applying for a specific role or switching employers.",
        features: [
          "Professionally written, ATS-friendly CV",
          "Tailored cover letter, included at no extra charge",
          "Matched to your industry and target role",
          "Free interview follow-up email",
          "11 months of free revisions",
        ],
      },
      {
        id: "linkedin",
        name: "LinkedIn Profile",
        prices: { entry: 100, professional: 150, senior: 200, executive: 250 },
        priceNote: "Fixed price, no surprises",
        tagline: "A keyword-rich profile that recruiters in the Gulf actually find.",
        bestFor: "Anyone being headhunted, or who wants to be.",
        features: [
          "Complete LinkedIn profile rewrite",
          "SEO-optimised headline and About section",
          "Experience and skills rewritten for recruiter search",
          "Custom-designed cover banner and profile picture",
          "11 months of free revisions",
        ],
      },
      {
        id: "complete",
        name: "Complete Package",
        prices: { entry: 200, professional: 300, senior: 400, executive: 500 },
        priceNote: "Saves £50 vs buying separately",
        tagline: "CV, cover letter and LinkedIn, all telling the same strong story.",
        bestFor: "Career moves, relocations and senior or executive applications.",
        features: [
          "Everything in CV & Cover Letter",
          "Full LinkedIn profile optimisation",
          "Consistent personal brand across every document",
          "Free interview follow-up email",
          "11 months of free revisions",
        ],
        highlight: true,
        badge: "Most popular",
      },
      {
        id: "biography",
        name: "Professional Biography",
        prices: { entry: 200, professional: 200, senior: 200, executive: 250 },
        levels: ["senior", "executive"],
        priceNote: "Short, medium and long versions",
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
      {
        id: "portfolio",
        name: "Portfolio Website",
        prices: { entry: 350, professional: 350, senior: 350, executive: 350 },
        flat: true,
        priceNote: "One price at every level",
        tagline: "A personal portfolio website that shows your work, not just lists it.",
        bestFor: "Designers, developers, consultants, creatives and executives who want to stand out.",
        features: [
          "Custom one-page or multi-page portfolio site",
          "Mobile-friendly, fast and SEO-ready",
          "Your projects, CV and contact details in one link",
          "Content writing and layout included",
          "11 months of free revisions",
        ],
      },
    ],
  },
  gulf: {
    badge: "Made for the GCC job market",
    title: "Written for how Gulf employers hire",
    intro:
      "Recruiters in the Gulf review hundreds of applications for every opening. We shape your documents so the right details land in the first few seconds.",
    points: [
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
    ],
    markets: [
      "Saudi Arabia (KSA)",
      "United Arab Emirates",
      "Qatar",
      "Kuwait",
      "Bahrain",
      "Oman",
    ],
  },
  portfolio: {
    badge: "New service",
    title: "Your work deserves more than a PDF",
    intro:
      "Pair your CV with a portfolio website that recruiters, clients and boards can open with one link. We design, write and build it for you.",
    points: [
      "Hero section, about, projects, skills and contact",
      "Your own domain and mobile-friendly design",
      "Matches the tone of your CV and LinkedIn profile",
      "Built in English, with Arabic available on request",
    ],
    imageAlt: "Sample portfolio website layout",
    cta: "Ask about a portfolio website",
  },
  included: {
    title: "Included with every order",
    intro: "Premium quality without the premium price tag that high-end UK CV writers charge.",
    items: [
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
    ],
  },
  how: {
    title: "How it works",
    intro: "A fast, simple process — from first message to finished documents.",
    steps: [
      {
        title: "Send your details",
        desc: "Choose a package and career level, then fill in the short form below. Tell us the role, industry and country you are targeting.",
      },
      {
        title: "Confirm your order",
        desc: "We reply within 24 hours to confirm your package, delivery date and payment details. Nothing is charged until you agree.",
      },
      {
        title: "Share your current CV",
        desc: "Send your existing CV or career notes. We may ask a few quick questions to capture your wins.",
      },
      {
        title: "Review and refine",
        desc: "Receive your documents on time, request edits, and enjoy 11 months of free revisions.",
      },
    ],
  },
  order: {
    title: "Place your order",
    intro:
      "Pick your package and career level, then tell us about the role you are after. We will reply within 24 hours to confirm your order and delivery date. The price you see is the price you pay, and no payment is taken at this stage.",
    bullets: [
      "Fixed price shown before you order",
      "Free cover letter with CV packages",
      "11 months of free revisions",
      "Free interview follow-up email",
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "How much does a CV writing package cost?",
        a: "Prices are fixed and depend on your career level (Entry, Professional, Senior or Executive). CV & Cover Letter: £150 / £200 / £250 / £300. LinkedIn Profile: £100 / £150 / £200 / £250. Complete Package (CV, cover letter and LinkedIn): £200 / £300 / £400 / £500. Professional Biography: £200 (Senior) or £250 (Executive). Portfolio Website: £350.",
      },
      {
        q: "Which career level should I choose?",
        a: "Entry / Fresh is for 0 to 2 years of experience, Professional for 2 to 5 years, Senior for 5 to 10 years and Executive for 10+ years or director and C-level roles. If you sit between two levels, pick the one that matches the role you are applying for. We will tell you if a different level fits better.",
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
        a: "Timelines depend on the package and how quickly you share your information. We confirm a delivery date when we confirm your order, and we deliver on time.",
      },
      {
        q: "How do I pay, and in what currency?",
        a: "Prices are listed in GBP. Tell us your preferred currency (SAR, AED, USD and so on) in the form and we will confirm the equivalent and payment options when we confirm your order. Nothing is charged until you agree.",
      },
      {
        q: "Do you build portfolio websites?",
        a: "Yes. We design, write and build a personal portfolio website that sits alongside your CV and LinkedIn profile for a fixed £350. Choose the Portfolio Website package in the form and we will confirm your order within 24 hours.",
      },
      {
        q: "Can I see samples?",
        a: "Yes. Tick the sample request option on the form and we will send you CV samples relevant to your industry.",
      },
    ],
  },
  cta: {
    title: "Ready for your next role in the Gulf?",
    desc: "Pick your package and level, and we confirm your order within 24 hours.",
    button: "Order now",
  },
  form: {
    package: "Package",
    name: "Full name",
    email: "Email",
    phone: "WhatsApp / phone",
    phoneHint: "(with country code)",
    country: "Country you are applying in",
    level: "Career level",
    deadline: "When do you need it?",
    role: "Target role / industry",
    rolePlaceholder: "e.g. Project Manager, Oil & Gas",
    currency: "Preferred currency",
    yourPrice: "Your fixed price",
    fixedPriceNote: "Billed in GBP. Your preferred currency is confirmed by email.",
    levelAdjusted: "Biographies start at Senior level, so Senior pricing applies.",
    optional: "(optional)",
    noPreference: "No preference",
    notes: "Anything else?",
    notesPlaceholder: "Job link, specific requirements, or career goals...",
    samples: "Send me CV samples for my industry",
    submit: "Place my order",
    sending: "Sending...",
    note: "No payment now. We confirm your order and payment details by email first.",
    successTitle: "Request received",
    successBody:
      "Thank you. We will email you within 24 hours to confirm your order, delivery date and payment details. You can also reply with your current CV to speed things up.",
    again: "Submit another request",
    errName: "Name is required.",
    errEmail: "Email is required.",
    errEmailInvalid: "Enter a valid email address.",
    errRole: "Tell us the role or industry you are targeting.",
    errGeneric: "Something went wrong. Please try again.",
    errNetwork: "Network error — please check your connection and try again.",
    countries: [
      { value: "Saudi Arabia", label: "Saudi Arabia" },
      { value: "United Arab Emirates", label: "United Arab Emirates" },
      { value: "Qatar", label: "Qatar" },
      { value: "Kuwait", label: "Kuwait" },
      { value: "Bahrain", label: "Bahrain" },
      { value: "Oman", label: "Oman" },
      { value: "Other", label: "Other" },
    ],
    levels: [
      { value: "entry", label: "Entry / Fresh (0–2 years)" },
      { value: "professional", label: "Professional (2–5 years)" },
      { value: "senior", label: "Senior (5–10 years)" },
      { value: "executive", label: "Executive (10+ years)" },
    ],
    deadlines: [
      { value: "No rush", label: "No rush" },
      { value: "Within 1 week", label: "Within 1 week" },
      { value: "Within 3 days", label: "Within 3 days" },
      { value: "Urgent (24–48 hrs)", label: "Urgent (24–48 hrs)" },
    ],
  },
};

const ar: Content = {
  hero: {
    eyebrow: "السيرة الذاتية وLinkedIn والمستندات المهنية",
    title: "سيرة ذاتية تفتح لك الأبواب في السعودية والإمارات ودول الخليج",
    desc: "كتابة احترافية للسيرة الذاتية وخطاب التقديم وملف LinkedIn والنبذة التعريفية للطامحين إلى العمل في دول مجلس التعاون الخليجي. متوافقة مع أنظمة تتبع المتقدمين (ATS)، ومصممة وفق مجالك، مع 11 شهراً من التعديلات المجانية.",
    primary: "اطلب الآن",
    secondary: "استعرض الأسعار الثابتة",
  },
  stats: [
    { label: "خطاب التقديم", value: "مجاني" },
    { label: "تعديلات مجانية", value: "11 شهراً" },
    { label: "الباقات ابتداءً من", value: "£100" },
    { label: "دعم مباشر", value: "24/7" },
  ],
  packages: {
    title: "باقات مصممة حول أهدافك المهنية",
    intro:
      "اختر مستواك المهني لترى السعر الثابت. تشمل كل باقة تعديلات مجانية، والسعر الذي تراه هو السعر الذي تدفعه.",
    choose: "اختر هذه الباقة",
    orderNow: "اطلب الآن",
    bestFor: "مناسبة لـ:",
    levelsTitle: "المستوى المهني",
    levels: [
      { id: "entry", label: "مبتدئ / خريج جديد", years: "0–2 سنوات", blurb: "الخريجون ومن بدأوا مسيرتهم حديثاً في سوق العمل الخليجي." },
      { id: "professional", label: "محترف", years: "2–5 سنوات", blurb: "محترفون راسخون جاهزون للخطوة التالية." },
      { id: "senior", label: "كبير", years: "5–10 سنوات", blurb: "قادة الفرق والمديرون والمتخصصون الساعون إلى مناصب عليا." },
      { id: "executive", label: "تنفيذي", years: "أكثر من 10 سنوات", blurb: "المديرون وقادة الإدارة العليا ورواد الأعمال الساعون إلى أعلى المناصب." },
    ],
    groupIncludes: "يشمل كل مستوى",
    onlyFrom: "تُكتب النبذة التعريفية للمستويين الكبير والتنفيذي.",
    fixedBadge: "سعر ثابت",
    academicBold: "متاح أيضاً:",
    academicText:
      "كتابة السيرة الذاتية الأكاديمية للباحثين والمحاضرين، وتشمل الأبحاث المنشورة والمنح والتدريس والمؤتمرات. اختر المستوى الأقرب لمرحلتك المهنية واذكر ذلك في نموذج الطلب.",
    items: [
      {
        id: "cv-cover-letter",
        name: "السيرة الذاتية وخطاب التقديم",
        prices: { entry: 150, professional: 200, senior: 250, executive: 300 },
        priceNote: "خطاب التقديم مجاني",
        tagline: "سيرة ذاتية احترافية متوافقة مع ATS مع خطاب تقديم مخصص.",
        bestFor: "المهنيون المتقدمون لوظيفة محددة أو الراغبون في تغيير جهة العمل.",
        features: [
          "سيرة ذاتية مكتوبة باحترافية ومتوافقة مع أنظمة ATS",
          "خطاب تقديم مخصص مشمول دون أي رسوم إضافية",
          "مصممة وفق مجالك والوظيفة المستهدفة",
          "رسالة متابعة بعد المقابلة مجاناً",
          "11 شهراً من التعديلات المجانية",
        ],
      },
      {
        id: "linkedin",
        name: "ملف LinkedIn",
        prices: { entry: 100, professional: 150, senior: 200, executive: 250 },
        priceNote: "سعر ثابت دون مفاجآت",
        tagline: "ملف غني بالكلمات المفتاحية يصل إليه مسؤولو التوظيف في الخليج.",
        bestFor: "كل من يستهدفه الباحثون عن الكفاءات، أو يرغب في ذلك.",
        features: [
          "إعادة كتابة كاملة لملف LinkedIn",
          "عنوان وقسم «نبذة» محسّنان لمحركات البحث",
          "إعادة صياغة الخبرات والمهارات لتناسب بحث مسؤولي التوظيف",
          "تصميم غلاف وصورة شخصية مخصصين",
          "11 شهراً من التعديلات المجانية",
        ],
      },
      {
        id: "complete",
        name: "الباقة الشاملة",
        prices: { entry: 200, professional: 300, senior: 400, executive: 500 },
        priceNote: "توفير £50 مقارنة بشراء كل خدمة منفصلة",
        tagline: "سيرة ذاتية وخطاب تقديم وLinkedIn، جميعها تروي قصة نجاحك بصوت واحد.",
        bestFor: "التنقل الوظيفي، والانتقال إلى بلد جديد، والوظائف الإدارية العليا.",
        features: [
          "كل ما في باقة السيرة الذاتية وخطاب التقديم",
          "تحسين كامل لملف LinkedIn",
          "هوية مهنية متسقة في جميع المستندات",
          "رسالة متابعة بعد المقابلة مجاناً",
          "11 شهراً من التعديلات المجانية",
        ],
        highlight: true,
        badge: "الأكثر طلباً",
      },
      {
        id: "biography",
        name: "النبذة التعريفية المهنية",
        prices: { entry: 200, professional: 200, senior: 200, executive: 250 },
        levels: ["senior", "executive"],
        priceNote: "نسخ قصيرة ومتوسطة ومطوّلة",
        tagline: "نبذة مصقولة لموقعك الإلكتروني أو مؤتمراتك أو مجالس الإدارة أو الإعلام.",
        bestFor: "المديرون التنفيذيون والمستشارون ورواد الأعمال والمتحدثون والمرشحون لعضوية مجالس الإدارة.",
        features: [
          "تُكتب بصيغة المتكلم أو الغائب",
          "نسخ للموقع والمؤتمرات وملفات الشركات",
          "تبرز إنجازاتك ومكانتك",
          "أسلوب يناسب جمهورك",
          "11 شهراً من التعديلات المجانية",
        ],
      },
      {
        id: "portfolio",
        name: "موقع بورتفوليو شخصي",
        prices: { entry: 350, professional: 350, senior: 350, executive: 350 },
        flat: true,
        priceNote: "سعر واحد لكل المستويات",
        tagline: "موقع شخصي يعرض أعمالك بدل أن يكتفي بسردها.",
        bestFor: "المصممون والمطورون والمستشارون والمبدعون والتنفيذيون الراغبون في التميّز.",
        features: [
          "موقع بورتفوليو مخصص من صفحة واحدة أو عدة صفحات",
          "متوافق مع الجوال وسريع وجاهز لمحركات البحث",
          "مشاريعك وسيرتك الذاتية وبيانات التواصل في رابط واحد",
          "كتابة المحتوى والتصميم مشمولان",
          "11 شهراً من التعديلات المجانية",
        ],
      },
    ],
  },
  gulf: {
    badge: "مصممة لسوق العمل الخليجي",
    title: "نكتب وفق طريقة التوظيف في الخليج",
    intro:
      "يراجع مسؤولو التوظيف في الخليج مئات الطلبات لكل شاغر. نصيغ مستنداتك لتظهر التفاصيل المهمة في الثواني الأولى.",
    points: [
      {
        title: "مكتوبة لمسؤولي التوظيف في دول الخليج",
        desc: "ننظم سيرتك الذاتية وفق ما يبحث عنه مديرو التوظيف أولاً في الرياض ودبي وأبوظبي والدوحة والكويت: نطاق المسؤوليات والنتائج والصلة بالسوق الإقليمي.",
      },
      {
        title: "تفاصيل خاصة بالخليج",
        desc: "الجنسية ووضع الإقامة أو التأشيرة وفترة الإشعار واللغات ورخصة القيادة — نضيفها حيث تخدمك ونتركها حيث لا حاجة إليها.",
      },
      {
        title: "جاهزة لرؤية 2030 والمشاريع الكبرى",
        desc: "نُبرز خبرتك للقطاعات الأسرع نمواً في المملكة: الإنشاءات والبنية التحتية، والطاقة، والسياحة، والرعاية الصحية، والتقنية، والمال.",
      },
      {
        title: "منتقل أو مغترب؟ نفهم وضعك",
        desc: "نترجم خبراتك ومؤهلاتك وجهات عملك السابقة خارج المنطقة إلى لغة يعرفها مسؤولو التوظيف في الخليج ويثقون بها.",
      },
    ],
    markets: [
      "المملكة العربية السعودية",
      "الإمارات العربية المتحدة",
      "قطر",
      "الكويت",
      "البحرين",
      "سلطنة عُمان",
    ],
  },
  portfolio: {
    badge: "خدمة جديدة",
    title: "أعمالك تستحق أكثر من ملف PDF",
    intro:
      "أضف إلى سيرتك الذاتية موقع بورتفوليو يفتحه مسؤولو التوظيف والعملاء ومجالس الإدارة برابط واحد. نصمم الموقع ونكتب محتواه ونبنيه لك.",
    points: [
      "قسم رئيسي ونبذة ومشاريع ومهارات وتواصل",
      "نطاق خاص بك وتصميم متوافق مع الجوال",
      "يتناسق مع أسلوب سيرتك الذاتية وملف LinkedIn",
      "يُبنى بالإنجليزية، مع إمكانية إضافة العربية عند الطلب",
    ],
    imageAlt: "نموذج لتصميم موقع بورتفوليو",
    cta: "اسأل عن موقع البورتفوليو",
  },
  included: {
    title: "مشمول مع كل طلب",
    intro: "جودة عالية دون الأسعار المرتفعة التي يطلبها كتّاب السير الذاتية الراقون في بريطانيا.",
    items: [
      {
        title: "كتّاب متخصصون في مجالك",
        desc: "تُكتب سيرتك الذاتية على يد محترف يفهم مجالك، لتبدو لغتها كأنها من أهل الاختصاص.",
      },
      {
        title: "تنسيق متوافق مع ATS",
        desc: "هيكل واضح وكلمات مفتاحية مناسبة لتجتاز أنظمة تتبع المتقدمين وتصل إلى القارئ البشري.",
      },
      {
        title: "خطاب تقديم مجاني",
        desc: "مشمول مع باقات السيرة الذاتية دون رسوم إضافية، ومخصص للوظيفة التي تستهدفها.",
      },
      {
        title: "11 شهراً من التعديلات المجانية",
        desc: "وظيفة جديدة أو شهادة جديدة أو إنجاز جديد؟ أرسل التحديثات وسنحدّث مستنداتك مجاناً.",
      },
      {
        title: "رسالة متابعة بعد المقابلة مجاناً",
        desc: "رسالة شكر جاهزة للإرسال تُبقيك حاضراً في ذهن المسؤول بعد المقابلة.",
      },
      {
        title: "دعم مباشر على مدار الساعة",
        desc: "اسأل في أي وقت ومن أي منطقة زمنية، وسنرد عليك.",
      },
    ],
  },
  how: {
    title: "كيف تتم الخدمة",
    intro: "عملية سريعة وبسيطة — من أول رسالة حتى تسلّم المستندات النهائية.",
    steps: [
      {
        title: "أرسل بياناتك",
        desc: "اختر الباقة والمستوى المهني، ثم املأ النموذج القصير أدناه، وأخبرنا بالوظيفة والمجال والدولة التي تستهدفها.",
      },
      {
        title: "أكّد طلبك",
        desc: "نرد خلال 24 ساعة لتأكيد الباقة وموعد التسليم وتفاصيل الدفع. لا يُحصَّل أي مبلغ قبل موافقتك.",
      },
      {
        title: "شارك سيرتك الحالية",
        desc: "أرسل سيرتك الحالية أو ملاحظاتك المهنية، وقد نطرح عليك بعض الأسئلة السريعة لإبراز إنجازاتك.",
      },
      {
        title: "راجع وعدّل",
        desc: "تستلم مستنداتك في الموعد، وتطلب التعديلات، وتتمتع بـ11 شهراً من التعديلات المجانية.",
      },
    ],
  },
  order: {
    title: "قدّم طلبك",
    intro:
      "اختر الباقة والمستوى المهني، ثم أخبرنا عن الوظيفة التي تستهدفها. سنرد خلال 24 ساعة لتأكيد طلبك وموعد التسليم. السعر الذي تراه هو السعر الذي تدفعه، ولا يُحصَّل أي دفع في هذه المرحلة.",
    bullets: [
      "سعر ثابت يظهر قبل الطلب",
      "خطاب تقديم مجاني مع باقات السيرة الذاتية",
      "11 شهراً من التعديلات المجانية",
      "رسالة متابعة بعد المقابلة مجاناً",
    ],
  },
  faq: {
    title: "الأسئلة الشائعة",
    items: [
      {
        q: "كم تكلفة باقة كتابة السيرة الذاتية؟",
        a: "الأسعار ثابتة وتعتمد على مستواك المهني (مبتدئ، محترف، كبير، تنفيذي). السيرة الذاتية وخطاب التقديم: £150 / £200 / £250 / £300. ملف LinkedIn: £100 / £150 / £200 / £250. الباقة الشاملة (سيرة ذاتية وخطاب تقديم وLinkedIn): £200 / £300 / £400 / £500. النبذة التعريفية المهنية: £200 (كبير) أو £250 (تنفيذي). موقع البورتفوليو: £350.",
      },
      {
        q: "أي مستوى مهني أختار؟",
        a: "مبتدئ / خريج جديد لمن لديه 0 إلى 2 سنوات من الخبرة، ومحترف من 2 إلى 5 سنوات، وكبير من 5 إلى 10 سنوات، وتنفيذي لمن لديه أكثر من 10 سنوات أو يشغل منصب مدير أو قيادة عليا. وإن كنت بين مستويين فاختر المستوى الأقرب للوظيفة التي تتقدم إليها، وسنخبرك إن كان مستوى آخر أنسب لك.",
      },
      {
        q: "هل خطاب التقديم مجاني فعلاً؟",
        a: "نعم. يُقدَّم خطاب تقديم مخصص دون أي رسوم إضافية مع باقات السيرة الذاتية.",
      },
      {
        q: "هل ستناسب سيرتي الذاتية السعودية والإمارات ودول الخليج عموماً؟",
        a: "نعم. نكتب لمسؤولي التوظيف وجهات العمل في الخليج، ونراعي الأعراف الإقليمية مثل الجنسية ووضع التأشيرة وفترة الإشعار متى خدمت طلبك، ونبرز خبرتك بما يناسب قطاعات دول مجلس التعاون.",
      },
      {
        q: "هل السيرة الذاتية متوافقة مع أنظمة ATS؟",
        a: "نعم. تُنسَّق كل سيرة ذاتية لتجتاز أنظمة تتبع المتقدمين، وتتضمن كلمات مفتاحية من الوظيفة والمجال المستهدفين.",
      },
      {
        q: "ما المقصود بالتعديلات المجانية؟",
        a: "تحصل على 11 شهراً من التعديلات المجانية. إذا تغيرت خبراتك أو وظيفتك أو أهدافك، أرسل لنا التحديثات وسنحدّث مستنداتك دون أي تكلفة.",
      },
      {
        q: "هل تكتبون سيراً ذاتية أكاديمية؟",
        a: "نعم. نكتب السير الذاتية الأكاديمية التي تشمل الأبحاث والمنشورات والتدريس والمنح والمؤتمرات، إلى جانب السير الذاتية المهنية المعتادة.",
      },
      {
        q: "كم تستغرق مدة التسليم؟",
        a: "تعتمد المدة على الباقة وسرعة تزويدك لنا بمعلوماتك. نؤكد لك موعد التسليم عند تأكيد طلبك، ونلتزم بتسليمك في الموعد.",
      },
      {
        q: "كيف أدفع، وبأي عملة؟",
        a: "الأسعار معروضة بالجنيه الإسترليني. أخبرنا في النموذج بعملتك المفضلة (ريال سعودي أو درهم إماراتي أو دولار أمريكي وغيرها) وسنؤكد لك المبلغ المعادل وخيارات الدفع عند تأكيد طلبك. لا يُحصَّل أي مبلغ قبل موافقتك.",
      },
      {
        q: "هل تصممون مواقع بورتفوليو؟",
        a: "نعم. نصمم ونكتب ونبني موقع بورتفوليو شخصياً يكمل سيرتك الذاتية وملف LinkedIn بسعر ثابت قدره £350. اختر باقة موقع البورتفوليو في النموذج وسنؤكد طلبك خلال 24 ساعة.",
      },
      {
        q: "هل يمكنني الاطلاع على نماذج؟",
        a: "نعم. فعّل خيار طلب النماذج في النموذج وسنرسل لك نماذج سير ذاتية مناسبة لمجالك.",
      },
    ],
  },
  cta: {
    title: "جاهز لوظيفتك القادمة في الخليج؟",
    desc: "اختر باقتك ومستواك، وسنؤكد طلبك خلال 24 ساعة.",
    button: "اطلب الآن",
  },
  form: {
    package: "الباقة",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "واتساب / الهاتف",
    phoneHint: "(مع رمز الدولة)",
    country: "الدولة التي تتقدم للعمل فيها",
    level: "المستوى الوظيفي",
    deadline: "متى تحتاجها؟",
    role: "الوظيفة / المجال المستهدف",
    rolePlaceholder: "مثال: مدير مشروع، النفط والغاز",
    currency: "العملة المفضلة",
    yourPrice: "سعرك الثابت",
    fixedPriceNote: "الفوترة بالجنيه الإسترليني. نؤكد لك عملتك المفضلة بالبريد الإلكتروني.",
    levelAdjusted: "تبدأ النبذة التعريفية من المستوى الكبير، لذا يُطبَّق سعر المستوى الكبير.",
    optional: "(اختياري)",
    noPreference: "لا تفضيل",
    notes: "هل من شيء آخر؟",
    notesPlaceholder: "رابط الوظيفة أو متطلبات محددة أو أهدافك المهنية...",
    samples: "أرسلوا لي نماذج سير ذاتية لمجالي",
    submit: "أرسل طلبي",
    sending: "جارٍ الإرسال...",
    note: "لا دفع الآن. سنؤكد طلبك وتفاصيل الدفع بالبريد الإلكتروني أولاً.",
    successTitle: "تم استلام طلبك",
    successBody:
      "شكراً لك. سنراسلك خلال 24 ساعة لتأكيد طلبك وموعد التسليم وتفاصيل الدفع. ويمكنك الرد على رسالتنا مرفقاً بسيرتك الذاتية الحالية لتسريع العمل.",
    again: "إرسال طلب آخر",
    errName: "الاسم مطلوب.",
    errEmail: "البريد الإلكتروني مطلوب.",
    errEmailInvalid: "أدخل بريداً إلكترونياً صحيحاً.",
    errRole: "أخبرنا بالوظيفة أو المجال الذي تستهدفه.",
    errGeneric: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    errNetwork: "خطأ في الاتصال — تحقق من الإنترنت وحاول مرة أخرى.",
    countries: [
      { value: "Saudi Arabia", label: "المملكة العربية السعودية" },
      { value: "United Arab Emirates", label: "الإمارات العربية المتحدة" },
      { value: "Qatar", label: "قطر" },
      { value: "Kuwait", label: "الكويت" },
      { value: "Bahrain", label: "البحرين" },
      { value: "Oman", label: "سلطنة عُمان" },
      { value: "Other", label: "أخرى" },
    ],
    levels: [
      { value: "entry", label: "مبتدئ / خريج جديد (0–2 سنوات)" },
      { value: "professional", label: "محترف (2–5 سنوات)" },
      { value: "senior", label: "كبير (5–10 سنوات)" },
      { value: "executive", label: "تنفيذي (أكثر من 10 سنوات)" },
    ],
    deadlines: [
      { value: "No rush", label: "لا استعجال" },
      { value: "Within 1 week", label: "خلال أسبوع" },
      { value: "Within 3 days", label: "خلال 3 أيام" },
      { value: "Urgent (24–48 hrs)", label: "عاجل (24–48 ساعة)" },
    ],
  },
};

export const content: Record<Lang, Content> = { en, ar };

// English-only exports kept for the server-side JSON-LD in page.tsx
export const cvPackages = en.packages.items;
export const cvFaqs = en.faq.items;

// ---- Price helpers (shared by the page, form, JSON-LD and both chatbots) ----

export function packageLevels(p: CvPackage): LevelId[] {
  return p.levels ?? LEVEL_IDS;
}

/** The level a package is actually sold at: if `level` isn't offered
 *  (e.g. Biography at Entry), falls back to the lowest level that is. */
export function effectiveLevel(p: CvPackage, level: LevelId): LevelId {
  const offered = packageLevels(p);
  return offered.includes(level) ? level : offered[0];
}

export function priceFor(p: CvPackage, level: LevelId): number {
  return p.prices[effectiveLevel(p, level)];
}

export function gbp(n: number): string {
  return `£${n.toLocaleString("en-GB")}`;
}

/** Lowest and highest fixed price for a package. */
export function priceRange(p: CvPackage): { low: number; high: number } {
  const all = packageLevels(p).map((l) => p.prices[l]);
  return { low: Math.min(...all), high: Math.max(...all) };
}

/** "Entry £150 · Professional £200 · Senior £250 · Executive £300" (English). */
export function priceLine(p: CvPackage): string {
  if (p.flat) return gbp(p.prices.entry);
  const names = Object.fromEntries(en.packages.levels.map((l) => [l.id, l.label.split(" / ")[0]]));
  return packageLevels(p)
    .map((l) => `${names[l]} ${gbp(p.prices[l])}`)
    .join(" · ");
}
