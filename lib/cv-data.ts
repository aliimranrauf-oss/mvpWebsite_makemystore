// Content for /cv-writing in English (default) and Arabic.
// Edit prices, features and FAQs here only. Keep both languages in the same order.
//
// PRICING NOTE: the only confirmed figure is "from £40". Replace the
// "Quote on request" placeholders with your real starting prices whenever
// you're ready, in both languages.

export type Lang = "en" | "ar";

export type CvPackage = {
  id: string; // sent to the form + data-package attribute (never translated)
  name: string;
  price: string;
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
    bestFor: string;
    academicBold: string;
    academicText: string;
    items: CvPackage[];
  };
  gulf: { badge: string; title: string; intro: string; points: Pair[]; markets: string[] };
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
    primary: "Get my exact price",
    secondary: "View packages",
  },
  stats: [
    { label: "Cover letter", value: "Free" },
    { label: "Free revisions", value: "11 months" },
    { label: "Packages from", value: "£40" },
    { label: "Live chat", value: "24/7" },
  ],
  packages: {
    title: "Packages built around your career goals",
    intro:
      "Services start from £40. Every package includes free revisions, and you get a fixed price before any work begins.",
    choose: "Choose this package",
    bestFor: "Best for:",
    academicBold: "Also available:",
    academicText:
      "Academic CV writing for researchers and lecturers, covering publications, grants, teaching and conferences. Mention it in the order form.",
    items: [
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
    ],
  },
  order: {
    title: "Get your exact price",
    intro:
      "Tell us about the role you are after. We will reply within 24 hours with a fixed quote and delivery date. No payment is taken at this stage.",
    bullets: [
      "Fixed quote before any work starts",
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
    ],
  },
  cta: {
    title: "Ready for your next role in the Gulf?",
    desc: "Send your details and get a fixed price back within 24 hours.",
    button: "Get my exact price",
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
    optional: "(optional)",
    noPreference: "No preference",
    notes: "Anything else?",
    notesPlaceholder: "Job link, specific requirements, or career goals...",
    samples: "Send me CV samples for my industry",
    submit: "Get my exact price",
    sending: "Sending...",
    note: "No payment now. You will get a fixed quote by email first.",
    successTitle: "Request received",
    successBody:
      "Thank you. We will email you within 24 hours with your exact price and timeline. You can also reply with your current CV to speed things up.",
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
      { value: "Graduate / entry level", label: "Graduate / entry level" },
      { value: "Mid-level professional", label: "Mid-level professional" },
      { value: "Senior / manager", label: "Senior / manager" },
      { value: "Executive / C-level", label: "Executive / C-level" },
      { value: "Academic / researcher", label: "Academic / researcher" },
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
    primary: "احصل على السعر الدقيق",
    secondary: "استعرض الباقات",
  },
  stats: [
    { label: "خطاب التقديم", value: "مجاني" },
    { label: "تعديلات مجانية", value: "11 شهراً" },
    { label: "الباقات ابتداءً من", value: "£40" },
    { label: "دعم مباشر", value: "24/7" },
  ],
  packages: {
    title: "باقات مصممة حول أهدافك المهنية",
    intro:
      "تبدأ خدماتنا من £40. تشمل كل باقة تعديلات مجانية، وتحصل على سعر ثابت قبل بدء أي عمل.",
    choose: "اختر هذه الباقة",
    bestFor: "مناسبة لـ:",
    academicBold: "متاح أيضاً:",
    academicText:
      "كتابة السيرة الذاتية الأكاديمية للباحثين والمحاضرين، وتشمل الأبحاث المنشورة والمنح والتدريس والمؤتمرات. اذكر ذلك في نموذج الطلب.",
    items: [
      {
        id: "cv-cover-letter",
        name: "السيرة الذاتية وخطاب التقديم",
        price: "ابتداءً من £40",
        priceNote: "خطاب التقديم مجاني",
        tagline: "سيرة ذاتية احترافية متوافقة مع ATS مع خطاب تقديم مخصص.",
        bestFor: "المهنيون المتقدمون لوظيفة محددة أو الراغبون في تغيير جهة العمل.",
        features: [
          "سيرة ذاتية مكتوبة باحترافية ومتوافقة مع أنظمة ATS",
          "خطاب تقديم مخصص — مشمول دون أي رسوم إضافية",
          "مصممة وفق مجالك والوظيفة المستهدفة",
          "رسالة متابعة بعد المقابلة مجاناً",
          "11 شهراً من التعديلات المجانية",
        ],
      },
      {
        id: "linkedin",
        name: "ملف LinkedIn",
        price: "السعر عند الطلب",
        priceNote: "سعر ثابت يُؤكَّد قبل البدء",
        tagline: "ملف غني بالكلمات المفتاحية يصل إليه مسؤولو التوظيف في الخليج.",
        bestFor: "كل من يستهدفه الباحثون عن الكفاءات، أو يرغب في ذلك.",
        features: [
          "عنوان وقسم «نبذة» محسّنان لمحركات البحث",
          "إعادة صياغة الخبرات والمهارات لتناسب بحث مسؤولي التوظيف",
          "أسلوب مهني موثوق دون عبارات رنانة فارغة",
          "إرشادات حول الصورة والغلاف والرابط",
          "11 شهراً من التعديلات المجانية",
        ],
      },
      {
        id: "complete",
        name: "الباقة الشاملة",
        price: "السعر عند الطلب",
        priceNote: "أفضل قيمة — توفير على الباقة",
        tagline: "سيرة ذاتية وخطاب تقديم وLinkedIn، جميعها تروي قصة نجاحك بصوت واحد.",
        bestFor: "التنقل الوظيفي، والانتقال إلى بلد جديد، والوظائف الإدارية العليا.",
        features: [
          "كل ما في باقة السيرة الذاتية وخطاب التقديم",
          "تحسين كامل لملف LinkedIn",
          "هوية مهنية متسقة في جميع المستندات",
          "رسالة متابعة بعد المقابلة مجاناً",
          "11 شهراً من التعديلات المجانية",
          "إمكانية إضافة نبذة تعريفية",
        ],
        highlight: true,
        badge: "الأكثر طلباً",
      },
      {
        id: "biography",
        name: "النبذة التعريفية المهنية",
        price: "السعر عند الطلب",
        priceNote: "نسخة قصيرة أو متوسطة أو مطوّلة",
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
        desc: "اختر الباقة واملأ النموذج القصير أدناه، وأخبرنا بالوظيفة والمجال والدولة التي تستهدفها.",
      },
      {
        title: "احصل على سعرك الدقيق",
        desc: "نرد عليك بسعر ثابت وجدول زمني قبل أن تدفع أي مبلغ.",
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
    title: "احصل على سعرك الدقيق",
    intro:
      "أخبرنا عن الوظيفة التي تستهدفها. سنرد خلال 24 ساعة بسعر ثابت وموعد تسليم. لا يُحصَّل أي دفع في هذه المرحلة.",
    bullets: [
      "سعر ثابت قبل بدء أي عمل",
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
        a: "تبدأ باقات السيرة الذاتية وخطاب التقديم من £40. أما باقات LinkedIn والباقة الشاملة والنبذة التعريفية فتُسعَّر بحسب مستواك الوظيفي ونطاق العمل. أرسل النموذج في هذه الصفحة وستحصل على سعر ثابت ودقيق قبل بدء أي عمل.",
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
        a: "تعتمد المدة على الباقة وسرعة تزويدك لنا بمعلوماتك. نؤكد لك موعد التسليم في عرض السعر، ونلتزم بتسليمك في الموعد.",
      },
      {
        q: "كيف أدفع، وبأي عملة؟",
        a: "الأسعار معروضة بالجنيه الإسترليني. أخبرنا في النموذج بعملتك المفضلة (ريال سعودي أو درهم إماراتي أو دولار أمريكي وغيرها) وسنؤكد لك المبلغ المعادل وخيارات الدفع في عرض السعر.",
      },
      {
        q: "هل يمكنني الاطلاع على نماذج؟",
        a: "نعم. فعّل خيار طلب النماذج في النموذج وسنرسل لك نماذج سير ذاتية مناسبة لمجالك.",
      },
    ],
  },
  cta: {
    title: "جاهز لوظيفتك القادمة في الخليج؟",
    desc: "أرسل بياناتك واحصل على سعر ثابت خلال 24 ساعة.",
    button: "احصل على السعر الدقيق",
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
    optional: "(اختياري)",
    noPreference: "لا تفضيل",
    notes: "هل من شيء آخر؟",
    notesPlaceholder: "رابط الوظيفة أو متطلبات محددة أو أهدافك المهنية...",
    samples: "أرسلوا لي نماذج سير ذاتية لمجالي",
    submit: "احصل على سعري الدقيق",
    sending: "جارٍ الإرسال...",
    note: "لا دفع الآن. ستصلك بالبريد الإلكتروني عرض سعر ثابت أولاً.",
    successTitle: "تم استلام طلبك",
    successBody:
      "شكراً لك. سنراسلك خلال 24 ساعة بالسعر الدقيق والجدول الزمني. ويمكنك الرد على رسالتنا مرفقاً بسيرتك الذاتية الحالية لتسريع العمل.",
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
      { value: "Graduate / entry level", label: "خريج / مستوى مبتدئ" },
      { value: "Mid-level professional", label: "محترف متوسط الخبرة" },
      { value: "Senior / manager", label: "كبير / مدير" },
      { value: "Executive / C-level", label: "تنفيذي / قيادة عليا" },
      { value: "Academic / researcher", label: "أكاديمي / باحث" },
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
