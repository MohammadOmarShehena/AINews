export interface FeedArticle {
  id: string;
  storyId: string | null;
  title: string;
  frame: string;
  source: string;
  publishedAt: string | null;
  topicSlugs: string[];
  content: string;
  summary: string;
  url: string;
  author: string | null;
  authorId: string | null;
  isLiked?: boolean;
  isBookmarked?: boolean;
  imageUrl?: string | null;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  articleCount: number;
  followersCount: number;
  isFollowed?: boolean;
}

export interface BriefingSection {
  id: string;
  title: string;
  content: string;
  citations: string[];
}

export interface KeyEntity {
  name: string;
  type: string;
  role: string;
}

export interface BriefingDocument {
  story_id: string;
  headline: string;
  generated_at: string;
  depth_tier: string;
  summary: { text: string; citations: string[] };
  executive_summary?: string;
  sections: BriefingSection[];
  key_entities: KeyEntity[];
  suggested_questions: string[];
  source_articles: {
    id: string;
    title: string;
    url: string;
    content: string;
    author: string | null;
    authorId: string | null;
    published_at: string | null;
  }[];
}

export const MOCK_AUTHORS: Author[] = [
  {
    id: "author-nilekani",
    name: "Nandan Nilekani",
    role: "Founding Chairman, EkStep Foundation",
    avatar: "/avatars/nilekani.png",
    bio: "Co-founder of Infosys and architect of Aadhaar. Writing on public digital infrastructure, open networks, and sovereign AI ecosystems.",
    articleCount: 6,
    followersCount: 14200,
    isFollowed: false,
  },
  {
    id: "author-kotak",
    name: "Uday Kotak",
    role: "Founder & Director, Kotak Mahindra Bank",
    avatar: "/avatars/kotak.png",
    bio: "Veteran banker and financial market commentator focusing on macroeconomic trends, corporate governance, and digital credit.",
    articleCount: 5,
    followersCount: 18500,
    isFollowed: false,
  },
  {
    id: "author-rajan",
    name: "Raghuram Rajan",
    role: "Professor of Finance, University of Chicago",
    avatar: "/avatars/rajan.png",
    bio: "Former Governor of the Reserve Bank of India and IMF Chief Economist. Analyst of global fiscal policy, capital flows, and labor markets.",
    articleCount: 4,
    followersCount: 22100,
    isFollowed: false,
  },
  {
    id: "author-shaw",
    name: "Kiran Mazumdar-Shaw",
    role: "Executive Chairperson, Biocon",
    avatar: "/avatars/shaw.png",
    bio: "Biotech pioneer and entrepreneur examining healthcare innovation, biotech manufacturing, and venture capital in deeptech.",
    articleCount: 5,
    followersCount: 16800,
    isFollowed: false,
  },
];

export const MOCK_ARTICLES: FeedArticle[] = [
  {
    id: "art-1",
    storyId: "story-india-ai-mission",
    title: "India's ₹10,300-Crore AI Mission Approves First GPU Compute Tenders for Sovereign Cloud",
    frame: "POLICY & INFRASTRUCTURE",
    source: "The Economic Times",
    publishedAt: "2026-09-05T12:30:00.000Z",
    topicSlugs: ["artificial-intelligence", "cloud-computing", "policy"],
    summary: "The Ministry of Electronics and IT has cleared GPU capacity procurement under the IndiaAI Mission, earmarking over 10,000 graphics processors to offer subsidized compute to domestic startups and research institutions.",
    content: `NEW DELHI — In a major boost to India's foundational artificial intelligence capabilities, the Ministry of Electronics and Information Technology (MeitY) has finalized the technical framework and approved the initial allocation of tenders for sovereign cloud compute under the ₹10,372-crore IndiaAI Mission.

The procurement roadmap outlines access to 10,000 cutting-edge GPUs across public-private cloud providers within the next 18 months. Qualified startups, academic institutions, and national research centers will be eligible for up to 50% subsidized compute credits to train multimodal AI models grounded in Indic languages and domestic context.

"Compute availability remains the single largest bottleneck for high-growth Indian artificial intelligence labs," noted senior government officials familiar with the bidding process. "By creating a democratized compute commons, we are leveling the playing field against global tech giants and ensuring data sovereignty across core sectors including agriculture, healthcare, and education."

Industry consortiums, including representatives from top data center operators and indigenous semiconductor ventures, welcomed the move as pivotal for building non-hyperscaler reliant AI stacks.`,
    url: "https://economictimes.indiatimes.com/tech/technology/india-ai-mission-gpu-procurement",
    author: "Nandan Nilekani",
    authorId: "author-nilekani",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "art-2",
    storyId: "story-india-ai-mission",
    title: "Indian Startups Prepare Indic LLM Deployments as Subsidized Compute Windows Open",
    frame: "STARTUPS & TECH",
    source: "ET Tech",
    publishedAt: "2026-09-05T09:15:00.000Z",
    topicSlugs: ["artificial-intelligence", "startups", "indic-languages"],
    summary: "Domestic generative AI startups are accelerating release cycles for vernacular language models following the government's subsidized compute framework.",
    content: `BENGALURU — Early-stage AI ventures in Bengaluru and Hyderabad are gearing up to benchmark their latest Indic LLMs ahead of compute quota disbursements under the national AI program.

Founders report that training costs for 7B and 70B parameter models will drop by nearly 45%, enabling iterative fine-tuning in Tamil, Hindi, Telugu, and Marathi. Benchmark scores indicate promising parity with leading global open-weights models in zero-shot translation and structured business intelligence workflows.

Investors note that seed and Series A allocations toward AI applications are rising steadily, with venture funds prioritizing domain-specific enterprise tooling tailored for Indian retail, fintech, and public services delivery.`,
    url: "https://economictimes.indiatimes.com/tech/startups/indic-llm-deployments-surge",
    author: "Nandan Nilekani",
    authorId: "author-nilekani",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "art-3",
    storyId: "story-rbi-monetary-policy",
    title: "RBI MPC Holds Repo Rate at 6.5%, Signals Neutral Stance Amid Softening Inflation Prints",
    frame: "MONETARY POLICY",
    source: "The Economic Times",
    publishedAt: "2026-09-04T16:00:00.000Z",
    topicSlugs: ["banking", "rbi", "economy", "inflation"],
    summary: "The Reserve Bank of India Monetary Policy Committee has retained the policy repo rate at 6.5% for the tenth consecutive meeting while hinting at potential liquidity calibration heading into the festive quarter.",
    content: `MUMBAI — The Reserve Bank of India's Monetary Policy Committee (MPC) voted unanimously to maintain the benchmark policy repo rate unchanged at 6.50%, balancing resilient domestic GDP expansion against geopolitical headwinds and commodity price volatility.

Governor Shaktikanta Das highlighted that headline retail inflation has stabilized within the RBI's target band of 4% (+/- 2%), supported by strong kharif agricultural output and smoothed food supply chains. However, core services inflation remains under watchful vigilance.

"The real economy continues to demonstrate vigorous momentum driven by urban consumption and capital goods manufacturing," said the governor in the post-policy press conference. "We remain focused on aligning inflation durably with the 4% target while sustaining economic growth."

Bankers noted that deposit rates are expected to stay attractive across commercial lenders over the coming quarter, keeping net interest margins balanced.`,
    url: "https://economictimes.indiatimes.com/news/economy/policy/rbi-mpc-rates-decision",
    author: "Raghuram Rajan",
    authorId: "author-rajan",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "art-4",
    storyId: "story-rbi-monetary-policy",
    title: "Banking System Liquidity Rebounds as Government Spending and FII Debt Flows Accelerate",
    frame: "BANKING & FINANCE",
    source: "ET Markets",
    publishedAt: "2026-09-04T11:45:00.000Z",
    topicSlugs: ["banking", "liquidity", "markets"],
    summary: "Interbank liquidity shifted into a sustained surplus this week after sustained tax disbursements and steady inflows from sovereign debt index inclusions.",
    content: `MUMBAI — Net liquidity within the Indian banking system turned decisively positive, registering an average daily surplus of ₹85,000 crore this past week. 

Treasury desks attributed the turnaround to stepped-up government infrastructure expenditures and steady foreign institutional investment into Indian sovereign bonds. Money market yields softened by 6 to 9 basis points across commercial paper and certificates of deposit.

Credit growth remains robust at 14.8% year-on-year, led by retail mortgages and working capital drawdowns from mid-market corporate borrowers.`,
    url: "https://economictimes.indiatimes.com/markets/bonds/banking-liquidity-surplus",
    author: "Uday Kotak",
    authorId: "author-kotak",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "art-5",
    storyId: "story-biotech-pharma",
    title: "Biopharma Exports Top $30 Billion as Complex Generics and Biosimilar Approvals Expand",
    frame: "PHARMA & HEALTHCARE",
    source: "The Economic Times",
    publishedAt: "2026-09-03T14:20:00.000Z",
    topicSlugs: ["biopharma", "healthcare", "exports"],
    summary: "Indian biotechnology and pharmaceutical majors have logged record export revenues, buoyed by multi-regional market launches of complex oncology and immunology biologics.",
    content: `HYDERABAD — Driven by rapid market penetration across the US, Europe, and Latin America, Indian pharmaceutical and biopharma shipments reached an annualized peak of $31.2 billion for the preceding twelve months.

Investments in US FDA-compliant aseptic manufacturing, antibody-drug conjugate (ADC) pipelines, and continuous fermentation facilities are paying rich dividends. Domestic manufacturers now hold an estimated 28% global volume share in generic biosimilars.

"India's evolution from low-cost small-molecule manufacturing to advanced biologics engineering marks a strategic turning point," stated industry leaders. "With greater R&D tax incentives and clinical trial reforms, the sector is on track to cross $50 billion by 2030."`,
    url: "https://economictimes.indiatimes.com/industry/healthcare/biopharma-exports-surge",
    author: "Kiran Mazumdar-Shaw",
    authorId: "author-shaw",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "art-6",
    storyId: "story-ev-automotive",
    title: "Commercial EV Adoption Leaps 62% in Logistics Hubs Driven by Total Cost of Ownership Parity",
    frame: "AUTOMOTIVE & ESG",
    source: "ET Auto",
    publishedAt: "2026-09-02T10:00:00.000Z",
    topicSlugs: ["automotive", "ev", "logistics"],
    summary: "Fleet operators are rapidly phasing out diesel light commercial vehicles in favor of electric delivery vans across top Tier-1 and Tier-2 delivery corridors.",
    content: `PUNE — Rapid network rollouts of high-power DC fast charging depots combined with declining lithium iron phosphate (LFP) battery cell pack prices have triggered an inflection in commercial vehicle electrification across India.

Data from the Vahan portal shows light commercial EV registrations climbed 62% year-on-year in August. E-commerce platforms and quick-commerce logistics operators cite up to 40% reductions in operational costs per kilometer as the primary catalyst.

Domestic OEMs are expanding dedicated EV chassis lines, with several planned battery cell gigafactories slated to begin commercial commissioning in Tamil Nadu and Gujarat by year-end.`,
    url: "https://economictimes.indiatimes.com/industry/auto/commercial-ev-adoption-record",
    author: "Uday Kotak",
    authorId: "author-kotak",
    imageUrl: "https://images.unsplash.com/photo-1558441719-8b449c6ff673?auto=format&fit=crop&w=1200&q=80",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "art-7",
    storyId: "story-semiconductor-ecosystem",
    title: "Semiconductor Fab Construction Enters Cleanroom Phase at Dholera and Sanand",
    frame: "SEMICONDUCTOR & HARDWARE",
    source: "ET Tech",
    publishedAt: "2026-09-01T08:30:00.000Z",
    topicSlugs: ["semiconductors", "hardware", "manufacturing"],
    summary: "The commercial fabrication facilities in Gujarat have reached advanced structural completion, with pilot wafer processing scheduled to begin in mid-2027.",
    content: `GANDHINAGAR — India's multi-billion dollar semiconductor ambitions took a major physical step forward today as cleanroom equipment installations commenced at the commercial wafer fab and OSAT packaging facilities in Dholera and Sanand.

Specialized tool sets from leading European and Japanese semiconductor equipment makers are arriving at Indian ports under expedited customs green channels. The facility will initially focus on 28nm and 40nm nodes targeting automotive MCUs, IoT connectivity chips, and power management ICs.

Over 1,200 local engineers trained in Taiwan and Japan have returned to staff initial cleanroom trials and calibration exercises.`,
    url: "https://economictimes.indiatimes.com/tech/hardware/semiconductor-fab-cleanroom-progress",
    author: "Nandan Nilekani",
    authorId: "author-nilekani",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "art-8",
    storyId: "story-global-trade",
    title: "Global Supply Chain Realignments Propel Indian Electronics Exports to New Highs",
    frame: "TRADE & MANUFACTURING",
    source: "The Economic Times",
    publishedAt: "2026-08-31T17:45:00.000Z",
    topicSlugs: ["economy", "trade", "manufacturing"],
    summary: "Smartphone and electronic component assemblies shipped from Indian production hubs expanded 38% in the second quarter.",
    content: `CHENNAI — Production Linked Incentive (PLI) schemes continue to yield quantifiable export windfalls, with outbound electronics shipments outperforming all other non-oil export categories in the current fiscal year.

State-of-the-art electronics manufacturing clusters near Chennai, Bengaluru, and Noida have expanded automated SMD lines to cater to surging global holiday orders. Major OEMs have diversified their tier-2 supplier footprints locally, increasing domestic value addition from 12% to over 24%.

Trade analysts anticipate electronics will become India's third largest overall export segment before the close of the decade.`,
    url: "https://economictimes.indiatimes.com/news/economy/foreign-trade/electronics-exports-pli",
    author: "Raghuram Rajan",
    authorId: "author-rajan",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    isLiked: false,
    isBookmarked: false,
  }
];

export const MOCK_STORIES = [
  {
    id: "story-india-ai-mission",
    title: "National AI Compute Subsidies & Indic Model Acceleration",
    articleCount: 2,
    latestUpdate: "2026-09-05T12:30:00.000Z",
    isFollowed: false,
  },
  {
    id: "story-rbi-monetary-policy",
    title: "RBI Rate Stance and Banking System Liquidity Dynamics",
    articleCount: 2,
    latestUpdate: "2026-09-04T16:00:00.000Z",
    isFollowed: false,
  },
  {
    id: "story-biotech-pharma",
    title: "Indian Biosimilars and High-Value Biopharma Global Expansion",
    articleCount: 1,
    latestUpdate: "2026-09-03T14:20:00.000Z",
    isFollowed: false,
  },
  {
    id: "story-ev-automotive",
    title: "Commercial Fleet Electrification and Battery Ecosystem",
    articleCount: 1,
    latestUpdate: "2026-09-02T10:00:00.000Z",
    isFollowed: false,
  },
  {
    id: "story-semiconductor-ecosystem",
    title: "Domestic Semiconductor Cleanroom Progress & Fab Construction",
    articleCount: 1,
    latestUpdate: "2026-09-01T08:30:00.000Z",
    isFollowed: false,
  }
];

export const MOCK_BRIEFINGS: Record<string, BriefingDocument> = {
  "story-india-ai-mission": {
    story_id: "story-india-ai-mission",
    headline: "India's Sovereign AI Push: 10,000 GPUs, Subsidized Tenders & Indic Models",
    generated_at: "2026-09-05T13:00:00.000Z",
    depth_tier: "EXECUTIVE BRIEFING",
    summary: {
      text: "The Indian government has enacted key procurement phases of the ₹10,372-crore IndiaAI Mission, clearing capacity tenders for 10,000 GPUs. This initiative is designed to drastically lower training costs for domestic startups and academic institutions developing Indic-language AI foundation models.",
      citations: ["art-1", "art-2"],
    },
    executive_summary: "Access to high-density compute has historically constrained domestic AI labs. The IndiaAI Mission directly addresses this bottleneck through public compute credits, enabling local researchers to fine-tune high-performance models tailored to domestic languages, financial regulations, and public health systems.",
    sections: [
      {
        id: "sec-1",
        title: "Compute Procurement & Tendering Milestones",
        content: "MeitY's approval initiates the delivery of over 10,000 enterprise GPUs across regional cloud availability zones. Participating cloud vendors must guarantee sovereign data hosting standards, high-bandwidth interconnects, and strict uptime SLAs.",
        citations: ["art-1"],
      },
      {
        id: "sec-2",
        title: "Impact on Startups and Indic Foundation Models",
        content: "Startup founders estimate that compute subsidies of up to 50% will reduce training expenses from crores to lakhs, allowing small agile engineering teams to release competitive open-weight models in Hindi, Tamil, Telugu, Marathi, and Bengali.",
        citations: ["art-2"],
      },
      {
        id: "sec-3",
        title: "Strategic Outlook & Global Competitiveness",
        content: "By anchoring foundational AI assets within Indian jurisdiction, policymakers seek to safeguard sovereign citizen data while nurturing an export-ready deeptech ecosystem capable of delivering enterprise software across the Global South.",
        citations: ["art-1", "art-2"],
      },
    ],
    key_entities: [
      { name: "MeitY", type: "Government Ministry", role: "Policy formulation and sovereign compute procurement" },
      { name: "IndiaAI Mission", type: "National Initiative", role: "₹10,372-crore fund driving compute, data sets, and skills" },
      { name: "Indic LLMs", type: "Technology Domain", role: "Multimodal language models trained on indigenous linguistic corpora" },
    ],
    suggested_questions: [
      "How will startups qualify for subsidized GPU compute credits?",
      "Which specific Indic languages are prioritized in the initial training cohorts?",
      "What are the data privacy requirements for cloud providers hosting sovereign workloads?",
    ],
    source_articles: [
      {
        id: "art-1",
        title: "India's ₹10,300-Crore AI Mission Approves First GPU Compute Tenders for Sovereign Cloud",
        url: "https://economictimes.indiatimes.com/tech/technology/india-ai-mission-gpu-procurement",
        content: "Full details on the tender approvals and cloud architecture requirements.",
        author: "Nandan Nilekani",
        authorId: "author-nilekani",
        published_at: "2026-09-05T12:30:00.000Z",
      },
      {
        id: "art-2",
        title: "Indian Startups Prepare Indic LLM Deployments as Subsidized Compute Windows Open",
        url: "https://economictimes.indiatimes.com/tech/startups/indic-llm-deployments-surge",
        content: "Startup reactions and early performance benchmarks on Indic language models.",
        author: "Nandan Nilekani",
        authorId: "author-nilekani",
        published_at: "2026-09-05T09:15:00.000Z",
      },
    ],
  },
  "story-rbi-monetary-policy": {
    story_id: "story-rbi-monetary-policy",
    headline: "RBI Maintains 6.5% Benchmark Repo Rate Amid Improving System Liquidity",
    generated_at: "2026-09-04T17:00:00.000Z",
    depth_tier: "FINANCIAL MACRO BRIEFING",
    summary: {
      text: "The Reserve Bank of India held interest rates steady at 6.50% while noting easing food price inflation. Simultaneously, banking system liquidity shifted into a comfortable surplus supported by fiscal releases and international bond inflows.",
      citations: ["art-3", "art-4"],
    },
    executive_summary: "The MPC maintained its neutral vigilance, balancing strong domestic manufacturing and consumer credit growth against external volatility. With liquidity returning to surplus, bank treasury operations have witnessed softening short-term borrowing yields.",
    sections: [
      {
        id: "sec-1",
        title: "Monetary Policy Committee Consensus",
        content: "The MPC voted unanimously to keep the repo rate at 6.50%. CPI inflation projections remain well within the 4.0% +/- 2% framework, although persistent weather-related food supply vulnerabilities warrant continued vigilance.",
        citations: ["art-3"],
      },
      {
        id: "sec-2",
        title: "Liquidity Dynamics & Treasury Yields",
        content: "Interbank liquidity expanded into a daily surplus exceeding ₹85,000 crore. This has eased short-term commercial paper rates, providing breathing room for mid-tier corporate financing and retail lending books.",
        citations: ["art-4"],
      },
    ],
    key_entities: [
      { name: "Reserve Bank of India (RBI)", type: "Central Bank", role: "Monetary policy and banking sector regulation" },
      { name: "Monetary Policy Committee (MPC)", type: "Regulatory Body", role: "Interest rate setting authority" },
      { name: "Commercial Banking System", type: "Financial Sector", role: "Credit transmission and deposit mobilization" },
    ],
    suggested_questions: [
      "When do economists forecast the first repo rate cut by the RBI?",
      "How is the liquidity surplus affecting fixed deposit and lending rates?",
      "What are the implications for foreign institutional investment in Indian debt?",
    ],
    source_articles: [
      {
        id: "art-3",
        title: "RBI MPC Holds Repo Rate at 6.5%, Signals Neutral Stance Amid Softening Inflation Prints",
        url: "https://economictimes.indiatimes.com/news/economy/policy/rbi-mpc-rates-decision",
        content: "Complete breakdown of the MPC statement and economic forecasts.",
        author: "Raghuram Rajan",
        authorId: "author-rajan",
        published_at: "2026-09-04T16:00:00.000Z",
      },
      {
        id: "art-4",
        title: "Banking System Liquidity Rebounds as Government Spending and FII Debt Flows Accelerate",
        url: "https://economictimes.indiatimes.com/markets/bonds/banking-liquidity-surplus",
        content: "Treasury desk analysis and interbank money market trends.",
        author: "Uday Kotak",
        authorId: "author-kotak",
        published_at: "2026-09-04T11:45:00.000Z",
      },
    ],
  },
};

export const MOCK_STORY_ARCS: Record<string, any> = {
  "story-india-ai-mission": {
    storyId: "story-india-ai-mission",
    narrativeArc: "From conceptual policy announcements in early 2024 to tangible GPU infrastructure rollouts in late 2026, India's AI mission has transitioned into an active execution phase.",
    currentPhase: "Compute Allocation & Model Fine-Tuning",
    milestones: [
      { date: "March 2024", event: "Cabinet approves ₹10,372-crore IndiaAI Mission", status: "completed" },
      { date: "January 2025", event: "Guidelines issued for sovereign AI datasets & compute clusters", status: "completed" },
      { date: "September 2026", event: "First 10,000 GPU tenders approved for cloud hosting", status: "current" },
      { date: "Mid 2027", event: "Target deployment of Indic multimodal foundational models", status: "upcoming" },
    ],
    stakeholders: [
      { name: "Domestic AI Startups", sentiment: "Bullish", impact: "Direct reduction in training costs" },
      { name: "Hyperscalers", sentiment: "Collaborative", impact: "Partnering on sovereign cloud nodes" },
      { name: "Academic Researchers", sentiment: "Optimistic", impact: "Access to high-compute clusters" },
    ],
  },
  "story-rbi-monetary-policy": {
    storyId: "story-rbi-monetary-policy",
    narrativeArc: "Prolonged rate plateau supported by disciplined fiscal consolidation, now leaning towards liquidity easing as inflation approaches target midpoint.",
    currentPhase: "Liquidity Normalization",
    milestones: [
      { date: "February 2023", event: "Repo rate raised to 6.50%", status: "completed" },
      { date: "Throughout 2024-2025", event: "Rate held steady for multiple consecutive meetings", status: "completed" },
      { date: "September 2026", event: "Policy pause maintained as liquidity shifts into surplus", status: "current" },
      { date: "Q1 2027", event: "Potential easing cycle as headline CPI stabilizes near 4%", status: "upcoming" },
    ],
    stakeholders: [
      { name: "Commercial Banks", sentiment: "Stable", impact: "Healthy Net Interest Margins (NIMs)" },
      { name: "Retail Borrowers", sentiment: "Cautious", impact: "Anticipating lower home loan EMIs" },
      { name: "Institutional Investors", sentiment: "Bullish", impact: "Sustained sovereign bond inflows" },
    ],
  },
};

export const MOCK_INTERESTS = [
  { slug: "artificial-intelligence", name: "Artificial Intelligence", isSelected: true },
  { slug: "banking", name: "Banking & Finance", isSelected: true },
  { slug: "economy", name: "Macro Economy", isSelected: true },
  { slug: "markets", name: "Stock Markets", isSelected: true },
  { slug: "startups", name: "Startups & VC", isSelected: false },
  { slug: "semiconductors", name: "Semiconductors", isSelected: false },
  { slug: "biopharma", name: "Biopharma & Health", isSelected: false },
  { slug: "automotive", name: "Automotive & EV", isSelected: false },
];

export const MOCK_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "New Sovereign AI Briefing Available",
    body: "IndiaAI Mission clears 10,000 GPU procurement tenders for domestic startups.",
    storyId: "story-india-ai-mission",
    createdAt: "2026-09-05T13:05:00.000Z",
    read: false,
  },
  {
    id: "notif-2",
    title: "Policy Alert: RBI MPC Decision",
    body: "Governor Das announces 6.50% pause with liquidity surplus expansion.",
    storyId: "story-rbi-monetary-policy",
    createdAt: "2026-09-04T16:10:00.000Z",
    read: true,
  },
  {
    id: "notif-3",
    title: "Nandan Nilekani published an article",
    body: "Read 'India's ₹10,300-Crore AI Mission Approves First GPU Compute Tenders'.",
    storyId: "story-india-ai-mission",
    createdAt: "2026-09-05T12:35:00.000Z",
    read: true,
  },
];
