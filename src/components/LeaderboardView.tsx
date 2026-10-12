"use client";

import React from "react";
import { LeaderboardUser, StudentProgress } from "@/lib/types";
import { Trophy, Medal, Flame, Zap, Award, Star, Gift } from "lucide-react";

interface LeaderboardViewProps {
  users: LeaderboardUser[];
  currentStudent: StudentProgress;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ users, currentStudent }) => {
  // Merge current student into leaderboard dynamic view
  const displayUsers = [...users];
  const existingIdx = displayUsers.findIndex((u) => u.studentNo === currentStudent.studentNo);
  const currentUserEntry: LeaderboardUser = {
    rank: 0,
    name: currentStudent.name + " (Sen)",
    studentNo: currentStudent.studentNo,
    avatar: currentStudent.avatar,
    currentWeek: currentStudent.currentWeek,
    totalXP: currentStudent.totalXP,
    streakDays: currentStudent.streakDays,
    isCertificateMinted: currentStudent.completedWeeks.length >= 4,
  };

  if (existingIdx !== -1) {
    displayUsers[existingIdx] = currentUserEntry;
  } else {
    displayUsers.push(currentUserEntry);
  }

  // Sort by totalXP descending
  displayUsers.sort((a, b) => b.totalXP - a.totalXP);
  displayUsers.forEach((u, i) => (u.rank = i + 1));

  const top3 = displayUsers.slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>Kulüp İçi Şeffaf Başarı Tablosu</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Haftanın En Aktif <span className="gradient-gold-text">Web3 Öğrenenleri</span>
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Notlarını teslim eden, AI Mentör ile tartışan ve serisini koruyan üyeler sıralamada yükselir.
        </p>
      </div>

      {/* Incentive Callout */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-amber-950/40 via-yellow-950/30 to-amber-950/40 border border-amber-500/30 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-300">Dönem Sonu Kulüp Ödülleri & Teşvik</h4>
            <p className="text-xs text-gray-300">
              Sıralamada ilk 10'a giren üyelerimize İstanbul Blockchain Week biletleri, kulüp özel swag paketi ve sponsor firmalarda staj mülakat önceliği sağlanacaktır.
            </p>
          </div>
        </div>
        <span className="shrink-0 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
          🏆 Top 10 Ayrıcalığı
        </span>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {top3.map((user, idx) => {
          const colors = [
            { border: "border-amber-400/50", glow: "glow-gold", badge: "bg-amber-400 text-black", title: "1. Şampiyon" },
            { border: "border-slate-300/40", glow: "", badge: "bg-slate-300 text-black", title: "2. Sıra" },
            { border: "border-amber-700/50", glow: "", badge: "bg-amber-700 text-white", title: "3. Sıra" },
          ][idx];

          return (
            <div
              key={idx}
              className={`relative bg-gray-900/80 rounded-2xl p-6 border ${colors.border} ${colors.glow} flex flex-col items-center text-center backdrop-blur-md`}
            >
              <div className="relative mb-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/20"
                />
                <span
                  className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-black shadow-md ${colors.badge}`}
                >
                  #{user.rank}
                </span>
              </div>

              <h4 className="text-base font-bold text-white mb-0.5">{user.name}</h4>
              <p className="text-xs text-gray-400 mb-3">Öğrenci No: {user.studentNo}</p>

              <div className="w-full flex items-center justify-around py-2.5 px-3 rounded-xl bg-gray-950/60 border border-gray-800 text-xs mb-3">
                <div className="flex items-center space-x-1 text-amber-400 font-bold">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{user.totalXP} XP</span>
                </div>
                <div className="h-3 w-[1px] bg-gray-800" />
                <div className="flex items-center space-x-1 text-orange-400 font-bold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{user.streakDays} Gün</span>
                </div>
              </div>

              {user.isCertificateMinted && (
                <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  <Award className="w-3.5 h-3.5" />
                  <span>Mezun (SBT Sahibi)</span>
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-950/80 border-b border-gray-800 text-xs uppercase text-gray-400 font-semibold">
              <tr>
                <th className="py-3.5 px-4 text-center w-16">Sıra</th>
                <th className="py-3.5 px-4">Kulüp Üyesi</th>
                <th className="py-3.5 px-4 text-center">Aktif Modül</th>
                <th className="py-3.5 px-4 text-right">Öğrenme Serisi</th>
                <th className="py-3.5 px-4 text-right">Toplam XP</th>
                <th className="py-3.5 px-4 text-center">Onchain Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-gray-300">
              {displayUsers.map((u) => {
                const isCurrent = u.studentNo === currentStudent.studentNo;
                return (
                  <tr
                    key={u.studentNo}
                    className={`transition-colors ${
                      isCurrent
                        ? "bg-blue-950/40 text-white font-semibold"
                        : "hover:bg-gray-800/40"
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                          u.rank === 1
                            ? "bg-amber-400 text-black"
                            : u.rank === 2
                            ? "bg-slate-300 text-black"
                            : u.rank === 3
                            ? "bg-amber-700 text-white"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {u.rank}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10"
                        />
                        <div>
                          <p className="font-semibold text-white leading-tight">
                            {u.name} {isCurrent && <span className="text-cyan-400 text-xs">(Sen)</span>}
                          </p>
                          <p className="text-xs text-gray-500 leading-tight">No: {u.studentNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {u.currentWeek}. Hafta
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center space-x-1 text-orange-400 font-bold">
                        <Flame className="w-3.5 h-3.5" />
                        <span>{u.streakDays} gün</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center space-x-1 text-amber-400 font-extrabold">
                        <Zap className="w-3.5 h-3.5" />
                        <span>{u.totalXP} XP</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      {u.isCertificateMinted ? (
                        <span className="inline-flex items-center space-x-1 text-xs text-amber-400 font-semibold">
                          <Award className="w-3.5 h-3.5" />
                          <span>SBT Mint Edildi</span>
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500">Devam Ediyor</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
