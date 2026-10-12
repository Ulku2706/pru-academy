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
                  ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/30 font-black"
                  : "text-cyan-400/80 hover:text-cyan-300"
              }`}
            >
              Geri Bildirim & Yol Haritası
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
        /* GERİ BİLDİRİM & YOL HARİTASI TAB */
        <div className="space-y-6">
          {/* Hackathon Sonuç & Puanlama Kartı */}
          <div className="bg-gray-900/60 border border-blue-500/30 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">PRU Blockchain Kulübü Hackathon'u</span>
                <h3 className="text-xl font-black text-white mt-0.5">Resmi Değerlendirme & Sonuç</h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-center">
                  <div className="text-[10px] text-gray-400">Sıralama</div>
                  <div className="text-base font-black text-white">2. / 4 Takım</div>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                  <div className="text-[10px] text-gray-400">Jüri Puanı</div>
                  <div className="text-base font-black text-emerald-400">8.90 / 10 <span className="text-[10px] font-normal text-emerald-300">(En Yüksek)</span></div>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-center">
                  <div className="text-[10px] text-gray-400">Final Skoru</div>
                  <div className="text-base font-black text-purple-300">7.48 / 10</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-gray-950/70 border border-emerald-500/20 space-y-2">
                <h4 className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Güçlü Yönler (Jüri & AI Notları)
                </h4>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                  <li><strong>En Kulübe Özgü Problem:</strong> "Not yazmadan geçilmez" kuralının yarattığı ghosting krizini doğrudan çözüyor.</li>
                  <li><strong>Özgün Sohbetten Not Sentezi:</strong> Ödev yükünü kaldırıp diyalogdan 3 maddelik ilerleme kanıtı çıkarma ürün fikri.</li>
                  <li><strong>Gerçek LLM Entegrasyonu:</strong> Yapay zeka sohbeti dinamik ve çok katmanlı çalışıyor.</li>
                  <li><strong>Temiz Mimari & Sıfır Hata:</strong> TypeScript ile hatasız derlenen, bileşenleri ayrılmış ve jüriden en yüksek puanı alan proje.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-gray-950/70 border border-amber-500/20 space-y-2">
                <h4 className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                  <Target className="w-4 h-4" /> Geri Bildirime Göre Yapılan Düzeltmeler
                </h4>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                  <li><strong>Sözleşme Güvenliği:</strong> <code className="text-cyan-300">issueCertificate</code> fonksiyonuna <code className="text-cyan-300">onlyOwner</code> denetimi eklendi.</li>
                  <li><strong>Gerçek Derleme & Deploy:</strong> <code className="text-cyan-300">solc</code> ve <code className="text-cyan-300">ethers</code> ile gerçek testnet deploy betiği yazıldı.</li>
                  <li><strong>Dürüst Etiketleme:</strong> Kontrat bağlı değilse "Demo Önizleme", bağlıysa gerçek zincir çağrısı çalışacak şekilde ayrıldı.</li>
                  <li><strong>Sohbet Geçmişi:</strong> Çoklu oturum ve sohbet geçmişi (LocalStorage) sisteme eklendi.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Kulüp Ürününe Dönüştürme Yol Haritası */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Kulüp Kullanımına Alma & Devralma Yol Haritası</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800 space-y-2">
                <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">1</div>
                <div className="font-bold text-white">Canlı Sepolia Dağıtımı</div>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Kulüp cüzdanına test ETH alınıp <code className="text-cyan-300">node contracts/scripts/deploy.js</code> çalıştırılarak sözleşme Arbitrum Sepolia'ya dağıtılır.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800 space-y-2">
                <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">2</div>
                <div className="font-bold text-white">Ortak Veritabanı</div>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Yönetici radarının kulüp üyelerini canlı takip edebilmesi için Supabase / PostgreSQL ile merkezi üye ilerleme tablosu bağlanır.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800 space-y-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">3</div>
                <div className="font-bold text-white">Vercel Ücretsiz Yayın</div>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  GitHub reposu kulüp organizasyonuna forklanarak Vercel üzerinde 0 TL maliyetle anında canlıya alınır.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
