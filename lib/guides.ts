export type Guide = { slug: string; kind: "Guide" | "Comparison"; title: string; description: string; keywords: string[]; sections: { h: string; p: string }[]; tool?: string };
export const guides: Guide[] = [
  { slug: "how-to-start-an-online-store", kind: "Guide", title: "How to Start an Online Store in 2026: Step by Step",
    description: "A practical beginner guide to launching an online store: product, platform, payments, shipping and first sales.", keywords: ["how to start an online store", "start ecommerce business", "online store checklist"], tool: "profit-margin-calculator",
    sections: [
      { h: "1. Pick a product with real margin", p: "Before building anything, check that the product can earn a healthy margin after fees, shipping and ads. Use a profit margin calculator with realistic numbers. If margin is under 25 percent, ad costs will usually erase your profit." },
      { h: "2. Choose a platform", p: "Hosted builders are fast to launch but charge monthly fees and limit design. A custom store gives full control and lower fees at scale. Decide based on how unique your checkout and catalogue need to be." },
      { h: "3. Set up payments and shipping", p: "Use a trusted payment provider, show total prices including shipping, and state delivery times clearly. Surprise costs at checkout are the top reason shoppers abandon carts." },
      { h: "4. Get your first customers", p: "Start with channels you control: WhatsApp, Instagram and email. Add a chatbot to answer common questions so you never lose a sale overnight. Then add search content to bring in free traffic over time." },
    ] },
  { slug: "how-to-build-a-saas-mvp", kind: "Guide", title: "How to Build a SaaS MVP Without Wasting Months",
    description: "Learn how to scope, build and launch a SaaS MVP quickly: pick one problem, build the smallest version, and get paying users.", keywords: ["saas mvp", "how to build mvp", "mvp development", "startup mvp checklist"],
    sections: [
      { h: "Start with one painful problem", p: "An MVP solves one problem for one type of customer. If you cannot describe it in one sentence, the scope is too big." },
      { h: "Build only the core flow", p: "List every feature, then cut until only sign-up, the core action and payment remain. Everything else can wait for user feedback." },
      { h: "Choose a boring, fast stack", p: "Next.js with a hosted database such as Supabase lets one developer ship auth, data and a dashboard quickly, and scales when you grow." },
      { h: "Launch and charge early", p: "Ask for payment within the first weeks. Paying users give better feedback than free ones, and prove the idea is worth continuing." },
    ] },
  { slug: "shopify-vs-custom-online-store", kind: "Comparison", title: "Shopify vs a Custom-Built Online Store: Which Is Better?",
    description: "Compare cost, speed, flexibility and ownership of Shopify versus a custom Next.js store so you can choose with confidence.", keywords: ["shopify vs custom", "shopify alternative", "custom ecommerce website cost"], tool: "profit-margin-calculator",
    sections: [
      { h: "Speed to launch", p: "Shopify wins for a first store: pick a theme, add products, sell within days. A custom build takes longer to plan and develop." },
      { h: "Cost over time", p: "Shopify has monthly plans plus app fees and transaction fees if you do not use its payments. Custom has a higher upfront cost but low running cost and no per-app subscriptions." },
      { h: "Flexibility and ownership", p: "A custom store lets you build any checkout, pricing rule or workflow, and you own the code and data. Hosted platforms limit you to what their ecosystem supports." },
      { h: "Our take", p: "Test an idea on a hosted platform. Move to custom when fees, limits or unique features start costing you more than development would." },
    ] },
  { slug: "best-pos-system-for-small-shop", kind: "Comparison", title: "Best POS System for a Small Shop: What to Compare",
    description: "How to compare POS systems for a small shop: hardware cost, fees, offline mode, reporting and whether to choose off-the-shelf or custom.", keywords: ["best pos system small shop", "pos comparison", "retail pos software", "custom pos"], tool: "invoice-generator",
    sections: [
      { h: "Hardware and setup cost", p: "Some POS products require proprietary terminals. Others run on a tablet or laptop you already own. Count total hardware cost before comparing monthly fees." },
      { h: "Fees", p: "Compare the monthly subscription, card processing percentage and any per-location or per-user charges. Small percentage differences add up at volume." },
      { h: "Offline mode and reporting", p: "Internet outages happen. Check the system can keep selling offline, and that daily sales, stock and tax reports are easy to read." },
      { h: "Off-the-shelf vs custom", p: "Off-the-shelf is quicker. A custom POS fits unusual workflows such as local tax rules, multiple branches or special billing, and has no per-seat licence." },
    ] },
];
export const getGuide = (s: string) => guides.find((g) => g.slug === s);
