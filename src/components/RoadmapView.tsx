"use client";

import React from "react";
import { StudentProgress, WeekLesson } from "@/lib/types";
import { PRU_CURRICULUM } from "@/data/curriculum";
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Clock,
  Zap,
  BookOpen,
  MessageSquare,
  FileText,
} from "lucide-react";

interface RoadmapViewProps {
  student: StudentProgress;
  onSelectWeek: (lesson: WeekLesson) => void;
  onOpenChat: (lesson: WeekLesson) => void;
  onOpenCertificate: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  student,
  onSelectWeek,
  onOpenChat,
  onOpenCertificate,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Guidance */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
            <span>Web3 & Blockchain Müfredatı</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              4 Haftalık Hızlandırılmış Program
            </span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Her haftanın konusu için AI Mentor ile sohbet et. Konuyu pekiştirip özet notunu çıkardığında bir sonraki modülün kilidi açılır.
          </p>
        </div>

        {student.completedWeeks.length >= 4 && (
          <button
            onClick={onOpenCertificate}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>SBT Sertifikasını Görüntüle</span>
          </button>
        )}
      </div>

      {/* Week Timeline Cards */}
      <div className="space-y-6 relative">
        {/* Connecting Timeline Line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-800 hidden md:block" />

        {PRU_CURRICULUM.map((lesson) => {
          const isCompleted = student.completedWeeks.some((w) => w.weekNumber === lesson.weekNumber);
          const isActive = !isCompleted && student.currentWeek === lesson.weekNumber;
          const isLocked = !isCompleted && student.currentWeek < lesson.weekNumber;

          const completedData = student.completedWeeks.find((w) => w.weekNumber === lesson.weekNumber);

          return (
            <div
              key={lesson.id}
              className={`relative rounded-2xl transition-all duration-300 md:ml-12 border ${
                isCompleted
                  ? "bg-gray-900/60 border-emerald-500/30 hover:border-emerald-500/50"
                  : isActive
                  ? "bg-gray-900/90 border-blue-500/40 glow-blue ring-1 ring-blue-500/30"
                  : "bg-gray-950/40 border-gray-800/60 opacity-60"
              }`}
            >
              {/* Timeline Node Badge on Desktop */}
              <div
                className={`absolute -left-12 top-6 -translate-x-1/2 w-8 h-8 rounded-full border-2 hidden md:flex items-center justify-center font-bold text-xs z-10 ${
                  isCompleted
                    ? "bg-emerald-950 border-emerald-500 text-emerald-400"
                    : isActive
                    ? "bg-blue-950 border-blue-400 text-blue-300 animate-pulse"
                    : "bg-gray-900 border-gray-700 text-gray-500"
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : isLocked ? <Lock className="w-3.5 h-3.5" /> : lesson.weekNumber}
              </div>

              <div className="p-6">
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        isCompleted
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : isActive
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "bg-gray-800 text-gray-400 border border-gray-700"
                      }`}
                    >
                      {lesson.weekNumber}. Hafta
                    </span>
                    <span className="text-xs text-gray-400 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lesson.duration}</span>
                    </span>
                    <span className="text-xs font-medium text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/50">
                      {lesson.category}
                    </span>
                  </div>

                  {/* Status Pills */}
                  <div>
                    {isCompleted ? (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Not Teslim Edildi & Onaylandı</span>
                      </span>
                    ) : isActive ? (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-cyan-300 border border-blue-500/40 animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Şimdi Çalışılıyor</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-800/80 text-gray-400 border border-gray-700/80">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Kilitli ({lesson.weekNumber - 1}. Hafta Notu Gerekli)</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Lesson Title & Summary */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  {lesson.summary}
                </p>

                {/* Key Concepts Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {lesson.keyConcepts.map((concept, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-gray-800/80 text-gray-300 border border-gray-700/60"
                    >
                      {concept}
                    </span>
                  ))}
                </div>

                {/* If completed, show summary box */}
                {isCompleted && completedData && (
                  <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-gray-300 flex items-start space-x-2.5">
                    <FileText className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-emerald-400 mb-0.5">Teslim Edilen Öğrenme Notu:</p>
                      <p className="line-clamp-2 text-gray-300 italic">{completedData.notes}</p>
                    </div>
                  </div>
                )}

                {/* Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-800/80">
                  <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold">
                    <Zap className="w-4 h-4" />
                    <span>Ödül: +{lesson.rewardXP} XP</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* View lesson details button */}
                    <button
                      onClick={() => onSelectWeek(lesson)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors flex items-center space-x-1.5 border border-gray-700"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Ders Notlarını Oku</span>
                    </button>

                    {/* Chat or Action button */}
                    {isCompleted ? (
                      <button
                        onClick={() => onSelectWeek(lesson)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 transition-colors flex items-center space-x-1.5 border border-emerald-500/30"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Not Detayını Gör</span>
                      </button>
                    ) : isActive ? (
                      <button
                        onClick={() => onOpenChat(lesson)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 shadow-md shadow-blue-500/20 transition-all flex items-center space-x-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>AI Mentör ile Konuş & Kilidi Aç</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-900 text-gray-500 cursor-not-allowed flex items-center space-x-1.5 border border-gray-800"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Kilitli</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
