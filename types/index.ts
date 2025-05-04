export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

export type BusinessProfile = {
  id: string;
  name: string;
  website?: string;
  businessType: string;
  revenueRange: string;
  industry: string;
  channels: string[];
  goals: string[];
  targetAudience?: string;
  challenges?: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type Message = {
  id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: Date;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  businessProfileId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MarketingTemplate = {
  id: string;
  title: string;
  description: string;
  type: "email" | "social" | "ad" | "landingPage";
  content: string;
  tags: string[];
  createdAt: Date;
};

export type Strategy = {
  id: string;
  title: string;
  description: string;
  steps: string[];
  channel: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeToImplement: string;
  expectedResults: string;
  businessType: string[];
};

export type MetricData = {
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  goal?: number;
  unit: string;
};

export type ChartData = {
  date: string;
  [key: string]: number | string;
};