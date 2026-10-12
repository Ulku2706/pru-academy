"use client";

import React from "react";
import { StudentProgress } from "@/lib/types";
import { Award, Flame, Zap, Shield, RotateCcw, Wallet, Bot, Sparkles } from "lucide-react";

interface NavbarProps {
  student: StudentProgress;
  activeTab: "roadmap" | "leaderboard" | "admin" | "rules";
  setActiveTab: (tab: "roadmap" | "leaderboard" | "admin" | "rules") => void;
  onResetDemo: () => void;
  onOpenCertificate?: () => void;
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  student,
  activeTab,
  setActiveTab,
  onResetDemo,
  onOpenCertificate,
  onOpenChat,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Club Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
              <span className="font-extrabold text-white text-lg tracking-wider">⚓</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg sm:text-xl text-white tracking-tight">
                  PRU <span className="text-cyan-400">AI-Academy</span>
                </span>
                <span className="hidden md:inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Proof-of-Learning
                </span>
              </div>
              <p className="text-xs text-gray-400 hidden sm:block">
                Piri Reis Üniversitesi Blockchain Kulübü
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5 bg-gray-900/80 p-1 rounded-xl border border-gray-800">
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "roadmap"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/60"
              }`}
            >
              Müfredat
            </button>
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "leaderboard"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/60"
              }`}
            >
              Sıralama
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "admin"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/60"
              }`}
            >
              Yönetici Radarı
            </button>
            <button
              onClick={() => setActiveTab("rules")}
              className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center space-x-1 ${
                activeTab === "rules"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/30 font-bold"
                  : "text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10"
              }`}
            >
              <span>📋 Hackathon Rehberi</span>
            </button>
          </nav>

          {/* AI Mentor Direct Launch Button */}
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/30 to-cyan-500/30 hover:from-blue-600/50 hover:to-cyan-500/50 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all shadow-sm"
              title="AI Mentör ile Sohbet Et"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>AI Mentör</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          )}

          {/* Student Status & Wallet Pill */}
          <div className="flex items-center space-x-3">
            {/* XP & Streak */}
            <div className="hidden lg:flex items-center space-x-2 bg-gray-900/90 border border-gray-800 px-3 py-1.5 rounded-xl">
              <div className="flex items-center space-x-1 text-amber-400">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold">{student.totalXP} XP</span>
              </div>
              <div className="h-3 w-[1px] bg-gray-700" />
              <div className="flex items-center space-x-1 text-orange-400">
                <Flame className="w-4 h-4" />
                <span className="text-xs font-bold">{student.streakDays} Gün</span>
              </div>
            </div>

            {/* Certificate badge if completed */}
            {student.completedWeeks.length >= 4 && (
              <button
                onClick={onOpenCertificate}
                className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-semibold text-xs px-3 py-1.5 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform"
              >
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">SBT Sertifika</span>
              </button>
            )}

            {/* User Pill */}
            <div className="flex items-center space-x-2 bg-gray-900 border border-gray-800 pl-2 pr-3 py-1 rounded-xl">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-blue-500/40"
              />
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-white leading-tight">{student.name}</p>
                <p className="text-[10px] text-gray-400 leading-tight">No: {student.studentNo}</p>
              </div>
            </div>

            {/* Demo Reset Button */}
            <button
              onClick={onResetDemo}
              title="Demoyu Sıfırla (Başa Dön)"
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-xl transition-colors border border-gray-800/80"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
