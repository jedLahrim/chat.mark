export const APP_NAME = "Mark";

export const WELCOME_MESSAGE = `
# Welcome to Mark 2! 👋

I'm your specialized e-commerce marketing assistant, ready to help your business grow rapidly. I can assist with:

- **Growth Strategies** - Custom marketing approaches for your business
- **Content Creation** - Email sequences, social media, and ad campaigns
- **Analytics Review** - Insights from your marketing data
- **Campaign Planning** - Complete marketing campaign creation
- **Competitive Analysis** - Strategies to outperform competitors

**Let's start with your business** - Tell me about your saas product or e-commerce store and what you're selling!
`;

export const SAMPLE_MESSAGES = [
  {
    role: "assistant",
    content: WELCOME_MESSAGE,
  },
];

export const SUGGESTION_CHIPS = [
  "How can I get more customers?",
  "Create an email campaign",
  "Optimize my product pages",
  "Instagram strategy",
  "Reduce cart abandonment",
  "Scale my Facebook ads",
];

export const MARKETING_CHANNELS = [
  { value: "social", label: "Social Media" },
  { value: "email", label: "Email Marketing" },
  { value: "ppc", label: "Paid Advertising" },
  { value: "seo", label: "Search Engine Optimization" },
  { value: "content", label: "Content Marketing" },
  { value: "influencer", label: "Influencer Marketing" },
  { value: "affiliate", label: "Affiliate Marketing" },
  { value: "sms", label: "SMS Marketing" },
];

export const BUSINESS_GOALS = [
  { value: "acquisition", label: "Customer Acquisition" },
  { value: "retention", label: "Customer Retention" },
  { value: "conversion", label: "Conversion Rate Optimization" },
  { value: "aov", label: "Increase Average Order Value" },
  { value: "awareness", label: "Brand Awareness" },
  { value: "loyalty", label: "Customer Loyalty" },
  { value: "expansion", label: "Market Expansion" },
];

export const BUSINESS_TYPES = [
  { value: "dtc", label: "Direct-to-Consumer" },
  { value: "marketplace", label: "Marketplace Seller" },
  { value: "subscription", label: "Subscription Business" },
  { value: "hybrid", label: "Hybrid Model" },
  { value: "dropshipping", label: "Dropshipping" },
  { value: "wholesale", label: "Wholesale/B2B" },
];

export const REVENUE_RANGES = [
  { value: "pre-launch", label: "Pre-launch" },
  { value: "0-1k", label: "$0 - $1K per month" },
  { value: "1k-10k", label: "$1K - $10K per month" },
  { value: "10k-50k", label: "$10K - $50K per month" },
  { value: "50k-100k", label: "$50K - $100K per month" },
  { value: "100k-500k", label: "$100K - $500K per month" },
  { value: "500k+", label: "$500K+ per month" },
];
