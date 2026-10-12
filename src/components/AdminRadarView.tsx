"use client";

import React, { useState } from "react";
import { AdminAnalytics, StudentProgress } from "@/lib/types";
import { MOCK_ADMIN_ANALYTICS } from "@/data/mockStudents";
import {
  ShieldAlert,
  Users,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  MessageCircle,
  Clock,
  Send,
  Eye,
  FileCheck,
} from "lucide-react";

interface AdminRadarViewProps {
  currentStudent: StudentProgress;
}

export const AdminRadarView: React.FC<AdminRadarViewProps> = ({ currentStudent }) => {
  const [nudgedStudents, setNudgedStudents] = useState<string[]>([]);

  const handleNudge = (studentName: string) => {
    setNudgedStudents((prev) => [...prev, studentName]);
  };

  const stuckStudents = [
    { name: "Ali Can Demir", studentNo: "230401019", week: 1, daysStuck: 6, status: "Hafta 1 notu bekleniyor" },
    { name: "Buse Yıldız", studentNo: "220102034", week: 2, daysStuck: 5, status: "Cüzdan güvenliği takıldı" },
    { name: "Mert Öztürk", studentNo: "230301082", week: 2, daysStuck: 4, status: "Private Key sorusunda kaldı" },
    { name: "Cemre Polat", studentNo: "240201011", week: 1, daysStuck: 7, status: "Henüz başlamadı" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Kulüp Yönetim Masası (Admin Dashboard)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Öğrenci İlerleme & <span className="text-indigo-400">Tıkanma Radarı</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            "Kimseden haber alamıyoruz" krizine son: Kim nerede kaldı, AI'a ne sordu, anlık takip et.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-indigo-300 bg-indigo-950/40 border border-indigo-500/30 px-3.5 py-2 rounded-xl">
          <Clock className="w-4 h-4 text-indigo-400" />
          <span>Canlı Güncelleniyor: 48 Kayıtlı Üye</span>
        </div>
      </div>

      {/* 4 Analytics KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-medium">Toplam Kayıtlı Üye</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-white">{MOCK_ADMIN_ANALYTICS.totalStudents}</p>
          <p className="text-[11px] text-emerald-400 mt-1">↑ Bu dönem +24 yeni üye</p>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-medium">Bu Hafta Aktif Olanlar</span>
            <CheckCircle className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-black text-white">{MOCK_ADMIN_ANALYTICS.activeThisWeek}</p>
          <p className="text-[11px] text-gray-400 mt-1">%71 katılım oranı</p>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-medium">Tıkanan (Alarm) Üyeler</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-amber-400">14 Öğrenci</p>
          <p className="text-[11px] text-amber-400/80 mt-1">4+ gündür not teslim etmedi</p>
        </div>

        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between text-gray-400 mb-2">
            <span className="text-xs font-medium">SBT Sertifika Mezunu</span>
            <FileCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400">{MOCK_ADMIN_ANALYTICS.certificatesMinted}</p>
          <p className="text-[11px] text-emerald-400 mt-1">Arbitrum Sepolia üzerinde</p>
        </div>
      </div>

      {/* Week Stage Distribution (Funnel) */}
      <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-1">Müfredat Aşamalarına Göre Öğrenci Dağılımı</h3>
        <p className="text-xs text-gray-400 mb-6">
          Hangi haftada kaç öğrenci var, kimler takıldı? Yönetim tıkanan yerleri tek bakışta görür.
        </p>

        <div className="space-y-5">
          {MOCK_ADMIN_ANALYTICS.weekDistribution.map((item) => {
            const percentage = Math.round((item.studentCount / MOCK_ADMIN_ANALYTICS.totalStudents) * 100);
            return (
              <div key={item.week} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">
                    {item.week}. Hafta: {item.title}
                  </span>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <span>{item.studentCount} Öğrenci (%{percentage})</span>
                    {item.stuckCount > 0 && (
                      <span className="text-amber-400 font-medium">
                        ⚠️ {item.stuckCount} kişi takıldı
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-950 rounded-full overflow-hidden flex border border-gray-800">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                  {item.stuckCount > 0 && (
                    <div
                      className="h-full bg-amber-500/80"
                      style={{ width: `${(item.stuckCount / MOCK_ADMIN_ANALYTICS.totalStudents) * 100}%` }}
                      title={`${item.stuckCount} kişi takıldı`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two columns: Stuck students list & AI Question insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stuck Students Watchlist */}
        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Kırmızı Alarm: İletişime Geçilmesi Gerekenler</span>
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                4+ gündür sonraki haftaya geçmeyen üyeler (Bırakma riski yüksek)
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {stuckStudents.map((st) => {
              const isNudged = nudgedStudents.includes(st.name);
              return (
                <div
                  key={st.studentNo}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-gray-950/70 border border-gray-800/80 text-xs"
                >
                  <div>
                    <p className="font-semibold text-white">{st.name}</p>
                    <p className="text-gray-400">
                      {st.week}. Hafta • <span className="text-amber-400">{st.daysStuck} gündür hareketsiz</span>
                    </p>
                  </div>

                  <button
                    onClick={() => handleNudge(st.name)}
                    disabled={isNudged}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center space-x-1.5 ${
                      isNudged
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
                    }`}
                  >
                    {isNudged ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Hatırlatıldı</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>WhatsApp'tan Dürt</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Mentor Top Questions Insight */}
        <div className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white">AI Mentor Soru Analizi & Kulüp Tavsiyesi</h3>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Öğrencilerin AI Chatbot'a en çok sorduğu konular (Kulübün bir sonraki fiziksel atölye gündemi):
            </p>

            <div className="space-y-2.5 mb-5">
              {MOCK_ADMIN_ANALYTICS.topAskedQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-gray-950/60 border border-gray-800/80 text-xs"
                >
                  <span className="text-gray-300 font-medium">{q.topic}</span>
                  <span className="font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                    {q.count} soru
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Club Recommendation */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 text-xs text-cyan-200">
            <span className="font-bold text-white block mb-1">💡 Yönetim Kurulu İçin Eylem Planı:</span>
            Öğrencilerin %56'sı 2. Haftada "Private Key vs Seed Phrase" ayrımında soru sormuştur. 
            Kulübün bu perşembe düzenleyeceği fiziksel toplantıda <strong>"Canlı Cüzdan Açma & Güvenlik Workshop'u"</strong> yapılması önerilir.
          </div>
        </div>
      </div>
    </div>
  );
};
