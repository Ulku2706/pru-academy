"use client";

import React from "react";
import { WeekLesson, StudentProgress } from "@/lib/types";
import {
  X,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  MessageSquare,
  ShieldCheck,
  FileText,
  Lock,
} from "lucide-react";

interface WeekDetailModalProps {
  lesson: WeekLesson | null;
  isOpen: boolean;
  onClose: () => void;
  student: StudentProgress;
  onOpenChat: (lesson: WeekLesson) => void;
}

export const WeekDetailModal: React.FC<WeekDetailModalProps> = ({
  lesson,
  isOpen,
  onClose,
  student,
  onOpenChat,
}) => {
  if (!isOpen || !lesson) return null;

  const isCompleted = student.completedWeeks.some((w) => w.weekNumber === lesson.weekNumber);
  const isActive = !isCompleted && student.currentWeek === lesson.weekNumber;
  const isLocked = !isCompleted && student.currentWeek < lesson.weekNumber;

  const completedData = student.completedWeeks.find((w) => w.weekNumber === lesson.weekNumber);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-gray-950 border border-gray-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden ring-1 ring-white/10">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gray-900 border-b border-gray-800 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {lesson.weekNumber}. Hafta Modülü
              </span>
              <span className="text-xs text-gray-400 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{lesson.duration}</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{lesson.title}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Key Concepts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Bu Haftanın Anahtar Kavramları
            </h4>
            <div className="flex flex-wrap gap-2">
              {lesson.keyConcepts.map((k, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-950/40 text-blue-300 border border-blue-800/40"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* Reading Material */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 text-sm text-gray-300 leading-relaxed space-y-3">
            <div className="font-semibold text-white flex items-center space-x-2 border-b border-gray-800 pb-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Ders Notları & Açıklamalar</span>
            </div>
            <div className="whitespace-pre-line">{lesson.readingMaterial}</div>
          </div>

          {/* Interactive Challenge */}
          <div className="bg-gradient-to-r from-purple-950/30 to-blue-950/30 border border-purple-500/20 rounded-xl p-5">
            <h4 className="text-sm font-bold text-purple-300 flex items-center space-x-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Öğrenme Görevi & AI Tartışması</span>
            </h4>
            <p className="text-xs text-gray-300 mb-3">{lesson.interactiveChallenge.prompt}</p>
            <div className="p-3 rounded-lg bg-gray-900/80 border border-purple-500/20 text-xs text-purple-200 italic">
              "{lesson.interactiveChallenge.sampleDiscussionQuestion}"
            </div>
          </div>

          {/* If already completed, show the submitted note */}
          {isCompleted && completedData && (
            <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-emerald-400 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sisteme Kayıtlı & Onaylı Öğrenme Notun</span>
                </span>
                <span className="text-[10px] text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Proof-of-Learning Kaydedildi
                </span>
              </div>
              <pre className="text-xs text-gray-200 whitespace-pre-wrap font-sans bg-gray-900/80 p-3.5 rounded-lg border border-gray-800">
                {completedData.notes}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-gray-900 border-t border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
            <Zap className="w-4 h-4" />
            <span>Kazanım: +{lesson.rewardXP} XP</span>
          </div>

          <div>
            {isCompleted ? (
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Bu hafta başarıyla tamamlandı</span>
              </div>
            ) : isActive ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenChat(lesson);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition-all flex items-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>AI Mentör ile Tartış & Not Çıkar</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2 text-gray-500 text-xs font-semibold">
                <Lock className="w-4 h-4" />
                <span>Önceki haftanın notunu teslim ederek bu haftayı aç</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
