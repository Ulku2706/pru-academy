import { StudentProgress, LeaderboardUser } from "./types";
import { INITIAL_LEADERBOARD } from "@/data/mockStudents";

const STORAGE_KEY = "pru_academy_student_progress";
const LEADERBOARD_KEY = "pru_academy_leaderboard";

export const DEFAULT_STUDENT: StudentProgress = {
  studentId: "pru-student-101",
  name: "Batuhan Demir",
  studentNo: "230401015",
  walletAddress: "0x71C...849F",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
  currentWeek: 1, // 1st week is active, weeks 2, 3, 4 are locked
  totalXP: 0,
  streakDays: 3,
  completedWeeks: [],
  certificateClaimed: false,
};

export function getStudentProgress(): StudentProgress {
  if (typeof window === "undefined") return DEFAULT_STUDENT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STUDENT));
      return DEFAULT_STUDENT;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_STUDENT;
  }
}

export function saveStudentProgress(progress: StudentProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Error saving progress to localStorage", e);
  }
}

export function getLeaderboard(): LeaderboardUser[] {
  if (typeof window === "undefined") return INITIAL_LEADERBOARD;
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) {
      localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(INITIAL_LEADERBOARD));
      return INITIAL_LEADERBOARD;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_LEADERBOARD;
  }
}

export function saveLeaderboard(users: LeaderboardUser[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(users));
  } catch (e) {
    console.error("Error saving leaderboard to localStorage", e);
  }
}

export function resetDemoProgress(): StudentProgress {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEADERBOARD_KEY);
    localStorage.removeItem("pru_academy_chat_sessions");
  }
  return DEFAULT_STUDENT;
}

const CHAT_SESSIONS_KEY = "pru_academy_chat_sessions";

export function getChatSessions(): import("./types").ChatSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CHAT_SESSIONS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveChatSessions(sessions: import("./types").ChatSession[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CHAT_SESSIONS_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error("Error saving chat sessions", e);
  }
}
