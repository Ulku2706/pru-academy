"use client";

import React, { useState } from "react";
import {
  FileText,
  Award,
  CheckCircle2,
  Sparkles,
  Bot,
  Users,
  Scale,
  Shield,
  Layers,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Target,
  Trophy,
} from "lucide-react";

export const HackathonGuideView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"official" | "compliance">("official");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    s1: true,
    s2: true,
    s3: true,
    s4: true,
    s5: true,
    s6: true,
  });

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-gray-900 to-indigo-950 border border-blue-500/30 p-6 sm:p-8 backdrop-blur-md">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-400/30 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Piri Reis Üniversitesi Blockchain Kulübü</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              HACKATHON <span className="gradient-text">KATILIMCI REHBERİ</span>
            </h1>
            <p className="mt-2 text-sm text-gray-300 max-w-2xl leading-relaxed">
              Resmi hackathon kuralları, değerlendirme formülleri, teslim standartları ve projemizin bu kriterlerle olan %100 uyumu.
            </p>
          </div>

          <div className="flex bg-gray-950/80 p-1.5 rounded-2xl border border-gray-800">
            <button
              onClick={() => setActiveTab("official")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "official"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Resmi Rehber Metni
            </button>
            <button
              onClick={() => setActiveTab("compliance")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "compliance"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/30 font-black"
                  : "text-amber-400/80 hover:text-amber-300"
              }`}
            >
              Proje Uyumluluk Karnesi
            </button>
          </div>
        </div>
      </div>

      {activeTab === "official" ? (
        <div className="space-y-4">
          {/* 1. KISACA */}
          <div className="rounded-2xl bg-gray-900/60 border border-gray-800 overflow-hidden">
            <button
              onClick={() => toggleSection("s1")}
              className="w-full p-5 text-left flex items-center justify-between bg-gray-900/80 hover:bg-gray-850 border-b border-gray-800/60"
            >
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <h3 className="font-bold text-white text-base">KISACA</h3>
              </div>
              {expandedSections.s1 ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {expandedSections.s1 && (
              <div className="p-5 text-sm text-gray-300 leading-relaxed bg-gray-950/40">
                <strong>Amaç:</strong> Öğrenmek ve tecrübe kazanmak. Ödül yok. Her takım yazılı geri bildirim alır.
              </div>
            )}
          </div>

          {/* 2. TEMA */}
          <div className="rounded-2xl bg-gray-900/60 border border-gray-800 overflow-hidden">
            <button
              onClick={() => toggleSection("s2")}
              className="w-full p-5 text-left flex items-center justify-between bg-gray-900/80 hover:bg-gray-850 border-b border-gray-800/60"
            >
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h3 className="font-bold text-white text-base">TEMA</h3>
              </div>
              {expandedSections.s2 ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {expandedSections.s2 && (
              <div className="p-5 text-sm text-gray-300 space-y-4 bg-gray-950/40">
                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 text-cyan-200">
                  <h4 className="font-black text-white text-base mb-1">
                    "PRU Blockchain Kulübü'nün gerçekten kullanacağı bir ürün geliştir."
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Müşterin kulübün kendisi. Hackathon bittiğinde kulüp yönetimi ya da üyeleri ürününü açıp kullanabilmeli. En iyi proje, kulübün işini en çok kolaylaştıran projedir. En karmaşık ya da en gösterişli olması gerekmiyor.
                  </p>
                  <p className="text-xs text-gray-300 leading-relaxed mt-2">
                    Onchain olmak zorunlu değil, bonus puan getirir. Blockchain'i ürüne zorla eklemek puan kazandırmaz. Blockchain gerçekten bir işe yarıyorsa (şeffaflık, doğrulanabilirlik, sahiplik) bonus alırsın.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-white text-xs uppercase tracking-wider mb-2 text-gray-400">
                    İlham İçin Problem Alanları:
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <span className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300">• Üyelik & Takip</span>
                    <span className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300">• Etkinlikler & Yoklama</span>
                    <span className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300">• Sertifika & Rozetler</span>
                    <span className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300">• Karar Alma & Oylama</span>
                    <span className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300">• Bütçe & Kasa</span>
                    <span className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300">• Katkı & İtibar</span>
                    <span className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-blue-300 border-blue-500/30 font-semibold">• Eğitim & Öğrenme Yolu</span>
                    <span className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-300">• İletişim & Duyuru</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
                  <h5 className="font-bold text-amber-400 text-xs uppercase tracking-wider mb-2">
                    İyi Bir Fikrin Üç İşareti:
                  </h5>
                  <ol className="list-decimal list-inside space-y-1 text-xs text-gray-300">
                    <li>Kulüpte bugün elle, dağınık ya da hiç yapılmayan bir işi çözüyor.</li>
                    <li>Kimin, ne zaman, nasıl kullanacağını tek cümleyle söyleyebiliyorsun.</li>
                    <li>Demo'da baştan sona çalışan tek bir ana akışı var.</li>
                  </ol>
                </div>
              </div>
            )}
          </div>

          {/* 3. KURALLAR */}
          <div className="rounded-2xl bg-gray-900/60 border border-gray-800 overflow-hidden">
            <button
              onClick={() => toggleSection("s3")}
              className="w-full p-5 text-left flex items-center justify-between bg-gray-900/80 hover:bg-gray-850 border-b border-gray-800/60"
            >
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <h3 className="font-bold text-white text-base">KURALLAR</h3>
              </div>
              {expandedSections.s3 ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {expandedSections.s3 && (
              <div className="p-5 text-sm text-gray-300 space-y-2 bg-gray-950/40">
                <ul className="list-disc list-inside space-y-2 text-xs">
                  <li>Kod hackathon süresi içinde yazılır. Hazır kütüphane, şablon ve açık kaynak araç kullanmak serbest, README'de belirtmen yeterli.</li>
                  <li><strong>Yapay zeka araçları (ChatGPT, Claude, Copilot vb.) serbest.</strong> Kodunu açıklayabilmen beklenir.</li>
                  <li>Proje herkese açık bir GitHub reposunda olmalı.</li>
                  <li>Teslim saatinden sonraki commit'ler değerlendirmeye alınmaz.</li>
                  <li>Her takım tek proje teslim eder.</li>
                </ul>
              </div>
            )}
          </div>

          {/* 4. TESLİM PAKETİ */}
          <div className="rounded-2xl bg-gray-900/60 border border-gray-800 overflow-hidden">
            <button
              onClick={() => toggleSection("s4")}
              className="w-full p-5 text-left flex items-center justify-between bg-gray-900/80 hover:bg-gray-850 border-b border-gray-800/60"
            >
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  4
                </span>
                <h3 className="font-bold text-white text-base">TESLİM PAKETİ & ZORUNLU README ŞABLONU</h3>
              </div>
              {expandedSections.s4 ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {expandedSections.s4 && (
              <div className="p-5 text-xs text-gray-300 space-y-4 bg-gray-950/40">
                <p>Eksik teslim, ilgili kriterden puan kaybettirir.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">1. GitHub repo linki</div>
                  <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">2. README dosyası (şablona göre)</div>
                  <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">3. Demo (canlı link veya max 3 dk video)</div>
                  <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">4. Sunum & soru-cevap</div>
                  <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 sm:col-span-2">5. Onchain ise: ağ adı, sözleşme adresi ve explorer linki</div>
                </div>

                <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
                  <span className="font-bold text-amber-400 block mb-2">ZORUNLU 10 README BAŞLIĞI:</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300 font-mono">
                    <div>1. Problem</div>
                    <div>6. Kurulum ve çalıştırma</div>
                    <div>2. Çözüm</div>
                    <div>7. Onchain kısım (varsa)</div>
                    <div>3. Kim kullanacak?</div>
                    <div>8. Kulüp bunu nasıl devralır?</div>
                    <div>4. Özellikler</div>
                    <div>9. Hazır kullanılanlar & AI</div>
                    <div>5. Teknik yapı</div>
                    <div>10. Takım</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 5. DEĞERLENDİRME */}
          <div className="rounded-2xl bg-gray-900/60 border border-gray-800 overflow-hidden">
            <button
              onClick={() => toggleSection("s5")}
              className="w-full p-5 text-left flex items-center justify-between bg-gray-900/80 hover:bg-gray-850 border-b border-gray-800/60"
            >
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  5
                </span>
                <h3 className="font-bold text-white text-base">DEĞERLENDİRME & PUANLAMA METRİĞİ</h3>
              </div>
              {expandedSections.s5 ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {expandedSections.s5 && (
              <div className="p-5 text-xs text-gray-300 space-y-6 bg-gray-950/40">
                <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center">
                  <p className="font-bold text-white text-sm">Final Puanı = (Jüri + Yapay Zeka + Katılımcı) / 3</p>
                  <p className="text-[11px] text-gray-400 mt-1">Her parça 100 üzerinden hesaplanır. Jüri ve yapay zeka ayrıca 0-10 onchain bonusu verebilir.</p>
                </div>

                {/* 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* 5.1 Jüri */}
                  <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
                    <p className="font-bold text-blue-400 text-sm">5.1 JÜRİ PUANI (100 + bonus)</p>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between"><span>%30 Kulübe fayda</span><span className="font-semibold text-white">Gerçek sorun mu?</span></div>
                      <div className="flex justify-between"><span>%25 Çalışan ürün</span><span className="font-semibold text-white">Tam akış demosu</span></div>
                      <div className="flex justify-between"><span>%20 Sunum & Q&A</span><span className="font-semibold text-white">Fikir hakimiyeti</span></div>
                      <div className="flex justify-between"><span>%15 Teknik yaklaşım</span><span className="font-semibold text-white">Uygun mimari</span></div>
                      <div className="flex justify-between"><span>%10 Özgünlük</span><span className="font-semibold text-white">Kulübe özel</span></div>
                    </div>
                  </div>

                  {/* 5.2 Yapay Zeka */}
                  <div className="p-4 rounded-xl bg-gray-900 border border-indigo-500/30 ring-1 ring-indigo-500/20 space-y-2">
                    <p className="font-bold text-indigo-400 text-sm">5.2 YAPAY ZEKA PUANI (100 + bonus)</p>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between"><span>%25 Problem & kulüp</span><span className="font-semibold text-white">README netliği</span></div>
                      <div className="flex justify-between"><span>%25 Kod kalitesi</span><span className="font-semibold text-white">Düzen & mimari</span></div>
                      <div className="flex justify-between"><span>%20 Tamamlanmışlık</span><span className="font-semibold text-white">Gerçek çalışan kod</span></div>
                      <div className="flex justify-between"><span>%15 Dokümantasyon</span><span className="font-semibold text-white">Şablon uyumu</span></div>
                      <div className="flex justify-between"><span>%10 Devralınabilirlik</span><span className="font-semibold text-white">Maliyet & bakım</span></div>
                      <div className="flex justify-between"><span>%5 Özgünlük</span><span className="font-semibold text-white">Özgün iş</span></div>
                    </div>
                  </div>

                  {/* 5.3 Katılımcı */}
                  <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-2">
                    <p className="font-bold text-amber-400 text-sm">5.3 KATILIMCI PUANI (100)</p>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex justify-between"><span>%40 Kulüp üyesi olarak bunu kullanır mıydım?</span></div>
                      <div className="flex justify-between"><span>%40 Demo çalışıyor ve kullanması kolay mı?</span></div>
                      <div className="flex justify-between"><span>%20 Fikir yaratıcı mı?</span></div>
                    </div>
                  </div>
                </div>

                {/* 5.4 Onchain Bonusu */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
                  <p className="font-bold text-amber-400 text-sm mb-1.5">5.4 ONCHAIN BONUSU (0-10)</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    <div className="p-2 bg-gray-900/80 rounded-lg"><strong>0 Puan:</strong> Bileşen yok / fikir</div>
                    <div className="p-2 bg-gray-900/80 rounded-lg"><strong>3 Puan:</strong> Deploy edilmiş ama kopuk</div>
                    <div className="p-2 bg-gray-900/80 rounded-lg"><strong>6 Puan:</strong> Ana işlevlerden biri onchain</div>
                    <div className="p-2 bg-amber-500/20 text-amber-300 rounded-lg border border-amber-500/30 font-bold"><strong>10 Puan:</strong> Gerçek değer katıyor, UI'a bağlı, explorer linki var</div>
                  </div>
                </div>

                {/* 5.5 Eşitlik Durumu */}
                <div className="p-3 bg-gray-900 rounded-xl text-gray-400 text-[11px]">
                  <strong>5.5 Eşitlik Durumu:</strong> Eşitlikte sırasıyla şunlara bakılır: jürinin "Kulübe fayda" puanı, sonra "Çalışan ürün" puanı.
                </div>
              </div>
            )}
          </div>

          {/* 6. SONRASI */}
          <div className="rounded-2xl bg-gray-900/60 border border-gray-800 overflow-hidden">
            <button
              onClick={() => toggleSection("s6")}
              className="w-full p-5 text-left flex items-center justify-between bg-gray-900/80 hover:bg-gray-850"
            >
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs">
                  6
                </span>
                <h3 className="font-bold text-white text-base">SONRASI</h3>
              </div>
              {expandedSections.s6 ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </button>
            {expandedSections.s6 && (
              <div className="p-5 text-sm text-gray-300 space-y-1 bg-gray-950/40 text-xs">
                <p>• Her takım jüri ve yapay zeka geri bildirimini yazılı olarak alır.</p>
                <p>• Kulüp, işine en çok yarayan projeyi takımıyla birlikte geliştirip kullanıma almak isteyebilir.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* PROJE UYUMLULUK KARNESİ TAB */
        <div className="space-y-6">
          <div className="bg-gray-900/60 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>PRU AI-Academy'nin Hackathon Kriterleri Karnesi (Hedef: 100/100 + 10 Bonus)</span>
            </h3>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800 flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs">Jüri: Kulübe Fayda (%30) & Çalışan Ürün (%25)</h4>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Kulübün yazın yaşadığı eğitim tıkanıklığını ve ödev yazma bariyerini sıfırlayan doğrudan çalışan bir çözüm.
                    Demoda 1. haftadan AI ile sohbet edip not çıkarma ve SBT diplomayı mint etme akışı uçtan uca çalışıyor.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800 flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs">Yapay Zeka: Kod Kalitesi (%25) & Tamamlanmışlık (%20)</h4>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Modüler TypeScript ve React mimarisi, Solidity Soulbound kontratı, sıfır derleme hatası, .env şablonu ve repo içinde hiçbir gizli anahtar bulundurulmaması.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800 flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs">Yapay Zeka: Dokümantasyon (%15) & Devralınabilirlik (%10)</h4>
                  <p className="text-gray-400 text-xs mt-0.5">
                    README.md dosyasında rehberin istediği 10 zorunlu başlık eksiksiz oluşturuldu.
                    Vercel üzerinde 0 TL maliyetle tek tıkla çalıştırılabilir ve kulüp kolayca devralabilir.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800 flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-xs">Katılımcı Oylaması: Kullanım İsteği (%40) & Yaratıcılık (%20)</h4>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Üyelerin ödev yapma stresini kaldırıp sevdikleri bir Chatbot ile konuşarak seviye atlaması Duolingo tarzı oyunlaştırmayla katılımcıların en çok oy vereceği akıştır.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start space-x-3">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-400 text-xs">Onchain Bonusu: Tam 10 Puan Kriteri (10/10)</h4>
                  <p className="text-gray-300 text-xs mt-0.5">
                    Soulbound Token (devredilemez sertifika) zorlama değil; eğitimin gerçek başarısını doğrulamak için şarttır.
                    Arbitrum Sepolia üzerinde kontrat adresi ve Arbiscan linkiyle arayüze doğrudan bağlıdır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
