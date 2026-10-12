export interface WeekLesson {
  id: number;
  weekNumber: number;
  title: string;
  duration: string;
  category: string;
  summary: string;
  keyConcepts: string[];
  readingMaterial: string;
  interactiveChallenge: {
    prompt: string;
    starterHint: string;
    sampleDiscussionQuestion: string;
  };
  rewardXP: number;
}

export interface StudentProgress {
  studentId: string;
  name: string;
  studentNo: string;
  walletAddress?: string;
  avatar: string;
  currentWeek: number;
  totalXP: number;
  streakDays: number;
  completedWeeks: {
    weekNumber: number;
    completedAt: string;
    notes: string;
    aiSynthesized: boolean;
    adminApproved: boolean;
  }[];
  certificateClaimed: boolean;
  certificateTxHash?: string;
  certificateTokenId?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  isSummaryProposal?: boolean;
  proposedNotes?: string;
}

export interface ChatSession {
  id: string;
  weekNumber: number;
  title: string;
  createdAt: string;
  messages: ChatMessage[];
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  studentNo: string;
  avatar: string;
  currentWeek: number;
  totalXP: number;
  streakDays: number;
  isCertificateMinted: boolean;
}

export interface AdminAnalytics {
  totalStudents: number;
  activeThisWeek: number;
  completionRate: number;
  certificatesMinted: number;
  weekDistribution: {
    week: number;
    title: string;
    studentCount: number;
    stuckCount: number;
  }[];
  topAskedQuestions: {
    topic: string;
    count: number;
    urgency: "high" | "medium" | "low";
  }[];
}
