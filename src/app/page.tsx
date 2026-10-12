"use client";

import React, { useState, useEffect } from "react";
import { StudentProgress, WeekLesson, LeaderboardUser } from "@/lib/types";
import { PRU_CURRICULUM } from "@/data/curriculum";
import {
  getStudentProgress,
  saveStudentProgress,
  getLeaderboard,
  saveLeaderboard,
  resetDemoProgress,
} from "@/lib/storage";

import { Navbar } from "@/components/Navbar";
import { StatsBanner } from "@/components/StatsBanner";
import { RoadmapView } from "@/components/RoadmapView";
import { WeekDetailModal } from "@/components/WeekDetailModal";
import { AIMentorChat } from "@/components/AIMentorChat";
import { LeaderboardView } from "@/components/LeaderboardView";
import { AdminRadarView } from "@/components/AdminRadarView";
import { CertificateModal } from "@/components/CertificateModal";
import { HackathonGuideView } from "@/components/HackathonGuideView";
import { Sparkles, Terminal, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function Home() {
  const [student, setStudent] = useState<StudentProgress | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [activeTab, setActiveTab] = useState<"roadmap" | "leaderboard" | "admin" | "rules">("roadmap");

  // Modals state
  const [selectedLesson, setSelectedLesson] = useState<WeekLesson | null>(null);
  const [chatLesson, setChatLesson] = useState<WeekLesson | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  useEffect(() => {
    setStudent(getStudentProgress());
    setLeaderboard(getLeaderboard());
  }, []);

  if (!student) {
    return (
      <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-gray-400">
        Yükleniyor...
      </div>
    );
  }

  const handleCompleteWeek = (weekNumber: number, notes: string) => {
    const currentLesson = PRU_CURRICULUM.find((l) => l.weekNumber === weekNumber) || PRU_CURRICULUM[0];

    const updatedCompletedWeeks = [
      ...student.completedWeeks.filter((w) => w.weekNumber !== weekNumber),
      {
        weekNumber,
        completedAt: new Date().toISOString(),
        notes,
        aiSynthesized: true,
        adminApproved: true,
      },
    ];

    const nextWeek = Math.min(weekNumber + 1, 4);
    const updatedStudent: StudentProgress = {
      ...student,
      currentWeek: nextWeek,
      totalXP: student.totalXP + currentLesson.rewardXP,
      completedWeeks: updatedCompletedWeeks,
    };

    setStudent(updatedStudent);
    saveStudentProgress(updatedStudent);

    // Update in leaderboard
    const updatedLb = getLeaderboard();
    const myIdx = updatedLb.findIndex((u) => u.studentNo === student.studentNo);
    if (myIdx !== -1) {
      updatedLb[myIdx].totalXP = updatedStudent.totalXP;
      updatedLb[myIdx].currentWeek = updatedStudent.currentWeek;
      saveLeaderboard(updatedLb);
      setLeaderboard(updatedLb);
    }
  };

  const handleClaimCertificateSuccess = (txHash: string, tokenId: string) => {
    const updatedStudent: StudentProgress = {
      ...student,
      certificateClaimed: true,
      certificateTxHash: txHash,
      certificateTokenId: tokenId,
    };
    setStudent(updatedStudent);
    saveStudentProgress(updatedStudent);

    const updatedLb = getLeaderboard();
    const myIdx = updatedLb.findIndex((u) => u.studentNo === student.studentNo);
    if (myIdx !== -1) {
      updatedLb[myIdx].isCertificateMinted = true;
      saveLeaderboard(updatedLb);
      setLeaderboard(updatedLb);
    }
  };

  const handleResetDemo = () => {
    const reset = resetDemoProgress();
    setStudent(reset);
    setLeaderboard(getLeaderboard());
  };

  // Quick Demo Fast-Forward helper (for presentation convenience)
  const handleFastForwardDemo = () => {
    const allCompleted = PRU_CURRICULUM.map((lesson) => ({
      weekNumber: lesson.weekNumber,
      completedAt: new Date().toISOString(),
      notes: `📘 [AI Özet]: ${lesson.title} modülü tüm kazanımlarıyla tamamlandı.`,
      aiSynthesized: true,
      adminApproved: true,
    }));

    const fullStudent: StudentProgress = {
      ...student,
      currentWeek: 4,
      totalXP: 750,
      completedWeeks: allCompleted,
    };

    setStudent(fullStudent);
    saveStudentProgress(fullStudent);

    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-[#090d16] flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <Navbar
          student={student}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onResetDemo={handleResetDemo}
          onOpenCertificate={() => setIsCertificateOpen(true)}
          onOpenChat={() => {
            const currentLesson = PRU_CURRICULUM.find((l) => l.weekNumber === student.currentWeek) || PRU_CURRICULUM[0];
            setChatLesson(currentLesson);
          }}
        />

        {/* Top Motivational Stats Banner */}
        <StatsBanner
          student={student}
          onOpenCertificate={() => setIsCertificateOpen(true)}
        />

        {/* Tab Content Views */}
        <main>
          {activeTab === "roadmap" && (
            <RoadmapView
              student={student}
              onSelectWeek={(lesson) => setSelectedLesson(lesson)}
              onOpenChat={(lesson) => setChatLesson(lesson)}
              onOpenCertificate={() => setIsCertificateOpen(true)}
            />
          )}

          {activeTab === "leaderboard" && (
            <LeaderboardView users={leaderboard} currentStudent={student} />
          )}

          {activeTab === "admin" && (
            <AdminRadarView currentStudent={student} />
          )}

          {activeTab === "rules" && (
            <HackathonGuideView />
          )}
        </main>
      </div>

      {/* Footer & Demo Shortcut Bar */}
      <footer className="mt-16 border-t border-gray-800/80 bg-gray-950/90 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="text-base">⚓</span>
            <span className="font-semibold text-gray-300">PRU Blockchain Kulübü</span>
            <span>• Hackathon 2026 Projesi</span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quick Demo Button */}
            {student.completedWeeks.length < 4 && (
              <button
                onClick={handleFastForwardDemo}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-500/30 font-medium transition-all"
                title="Jüriye son aşamayı ve Soulbound Sertifikayı anında göstermek için tıkla"
              >
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Hızlı Demo: 4 Haftayı Tamamla (Sertifika Aç)</span>
              </button>
            )}

            <span className="text-gray-500">
              Arbitrum Sepolia: <span className="font-mono text-cyan-400">0x3B89...88F3</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Floating AI Mentor Button (Sağ Altta Sabit Buton) */}
      <button
        onClick={() => {
          const currentLesson = PRU_CURRICULUM.find((l) => l.weekNumber === student.currentWeek) || PRU_CURRICULUM[0];
          setChatLesson(currentLesson);
        }}
        className="fixed bottom-6 right-6 z-50 flex items-center space-x-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white font-bold text-sm shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all ring-2 ring-white/20 group"
      >
        <div className="relative">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-ping" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5" />
          <span className="text-xl">🤖</span>
        </div>
        <div className="flex flex-col text-left">
          <span className="leading-tight flex items-center space-x-1">
            <span>PRU AI Mentor</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-extrabold uppercase">Canlı</span>
          </span>
          <span className="text-[10px] text-blue-100 font-normal leading-tight">
            Tıkla, Soru Sor & Notunu Çıkar
          </span>
        </div>
      </button>

      {/* Lesson Details Modal */}
      <WeekDetailModal
        lesson={selectedLesson}
        isOpen={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
        student={student}
        onOpenChat={(lesson) => {
          setSelectedLesson(null);
          setChatLesson(lesson);
        }}
      />

      {/* AI Mentor Chat Modal */}
      {chatLesson && (
        <AIMentorChat
          lesson={chatLesson}
          isOpen={!!chatLesson}
          onClose={() => setChatLesson(null)}
          onCompleteWeek={handleCompleteWeek}
        />
      )}

      {/* Soulbound Certificate Modal */}
      <CertificateModal
        student={student}
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        onClaimSuccess={handleClaimCertificateSuccess}
      />
    </div>
  );
}
