"use client";

import React from "react";
import { StudentProgress } from "@/lib/types";
import { Zap, Flame, CheckCircle2, Lock, Award, Sparkles, BookOpen } from "lucide-react";

interface StatsBannerProps {
  student: StudentProgress;
  onOpenCertificate?: () => void;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ student, onOpenCertificate }) => {
  const completedCount = student.completedWeeks.length;
  const progressPercent = Math.round((completedCount / 4) * 100);

  return (
    <div className="w-full bg-gradient-to-b from-blue-950/20 via-gray-900/40 to-transparent border-b border-gray-800/80 pb-8 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Pitch Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/20 border border-blue-500/20 p-6 sm:p-8 backdrop-blur-md mb-8">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-cyan-400 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kulüp İçi "Hayalet Üye" Krizine Son: Proof-of-Progress</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Ödev Stresi Yok, <span className="gradient-text">AI Mentor ile İnteraktif Öğrenme</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
                Uzun ödevler yazmakla uğraşma! İlgili haftanın konusunu incele, AI Mentor ile tartış.
                Tek tıkla öğrenme özetini oluştur, <strong className="text-white">sonraki haftanın kilidini anında aç</strong> ve dönem sonunda doğrulanabilir <strong className="text-amber-400">Onchain Soulbound Sertifikanı</strong> al!
              </p>
            </div>

            {/* Completion or Action Callout */}
            {completedCount >= 4 ? (
              <div className="flex flex-col items-center sm:items-end justify-center bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 sm:p-5 text-center sm:text-right">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm mb-1">
                  <Award className="w-5 h-5" />
                  <span>Tüm Modüller Tamamlandı!</span>
                </div>
                <p className="text-xs text-gray-300 mb-3">
                  Mezuniyet hakkı kazandın. Arbitrum Sepolia ağında Soulbound rozetini mint et.
                </p>
                <button
                  onClick={onOpenCertificate}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold text-xs rounded-lg shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform"
                >
                  Sertifikayı Görüntüle & Mint Et
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 bg-gray-900/80 border border-gray-800 rounded-xl p-4">
                <div className="text-center px-2">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Aktif Aşama</p>
                  <p className="text-xl font-bold text-blue-400">{student.currentWeek}. Hafta</p>
                </div>
                <div className="h-8 w-[1px] bg-gray-800" />
                <div className="text-center px-2">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">İlerleme</p>
                  <p className="text-xl font-bold text-white">%{progressPercent}</p>
                </div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-6 pt-5 border-t border-gray-800/80">
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span className="flex items-center space-x-1 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Müfredat İlerlemesi</span>
              </span>
              <span className="font-semibold text-gray-300">
                {completedCount} / 4 Hafta Tamamlandı (%{progressPercent})
              </span>
            </div>
            <div className="w-full h-3 bg-gray-950 rounded-full overflow-hidden p-0.5 border border-gray-800">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Toplam Başarı Puanı</p>
              <p className="text-lg font-bold text-white">{student.totalXP} XP</p>
            </div>
          </div>

          <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Öğrenme Serisi (Streak)</p>
              <p className="text-lg font-bold text-white">{student.streakDays} Gün Kesintisiz</p>
            </div>
          </div>

          <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Teslim Edilen Notlar</p>
              <p className="text-lg font-bold text-white">{completedCount} Hafta Onaylandı</p>
            </div>
          </div>

          <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Onchain Sertifika (SBT)</p>
              <p className="text-lg font-bold text-white">
                {student.certificateClaimed ? "Mint Edildi 🏆" : completedCount >= 4 ? "Hazır (Mint Et)" : "Aşama Bekleniyor"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
