import { NextResponse } from "next/server";
import { PRU_CURRICULUM } from "@/data/curriculum";

interface ChatRequestBody {
  weekNumber: number;
  message: string;
  history?: { sender: "user" | "ai"; text: string }[];
  action?: "chat" | "synthesize_notes";
}

async function callRealLLM(systemPrompt: string, userPrompt: string, history?: { sender: "user" | "ai"; text: string }[]) {
  // 1. Try Gemini API first if configured
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
      const geminiRes = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `${systemPrompt}\n\nKullanıcı: ${userPrompt}` }],
            },
          ],
        }),
      });
      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const output = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (output && output.trim()) return output.trim();
      }
    } catch (e) {
      console.warn("Gemini API call error", e);
    }
  }

  // 2. Try OpenAI API if configured
  const openAiKey = process.env.OPENAI_API_KEY;
  if (openAiKey) {
    try {
      const formattedMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
        { role: "system", content: systemPrompt },
      ];
      if (history) {
        for (const h of history.slice(-4)) {
          formattedMessages.push({
            role: h.sender === "user" ? "user" : "assistant",
            content: h.text,
          });
        }
      }
      formattedMessages.push({ role: "user", content: userPrompt });

      const oaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: formattedMessages,
        }),
      });
      if (oaiRes.ok) {
        const oaiData = await oaiRes.json();
        const oaiText = oaiData.choices?.[0]?.message?.content;
        if (oaiText && oaiText.trim()) return oaiText.trim();
      }
    } catch (e) {
      console.warn("OpenAI API call error", e);
    }
  }

  // 3. High-Speed Free Real LLM Endpoint (Pollinations AI POST)
  try {
    const formattedMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: systemPrompt },
    ];
    if (history) {
      for (const h of history.slice(-4)) {
        formattedMessages.push({
          role: h.sender === "user" ? "user" : "assistant",
          content: h.text,
        });
      }
    }
    formattedMessages.push({ role: "user", content: userPrompt });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    const res = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: formattedMessages,
        model: "openai",
        seed: Math.floor(Math.random() * 10000),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const text = await res.text();
      if (text && text.trim().length > 10) {
        return text.trim();
      }
    }
  } catch (err) {
    console.warn("Pollinations POST failed or timed out, trying fast GET fallback", err);
  }

  // 4. Fast Fallback via GET Pollinations
  try {
    const combinedPrompt = `${systemPrompt}\n\nÖğrencinin Sorusu: ${userPrompt}\n\nLütfen Türkçe, samimi ve net yanıtla:`;
    const encoded = encodeURIComponent(combinedPrompt);
    const getRes = await fetch(`https://text.pollinations.ai/${encoded}?model=openai`, {
      method: "GET",
    });
    if (getRes.ok) {
      const text = await getRes.text();
      if (text && text.trim().length > 10) {
        return text.trim();
      }
    }
  } catch (e) {
    console.warn("Fast GET fallback also failed", e);
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body: ChatRequestBody = await req.json();
    const { weekNumber, message, history, action } = body;

    const currentLesson = PRU_CURRICULUM.find((l) => l.weekNumber === weekNumber) || PRU_CURRICULUM[0];

    const systemPrompt = `Sen Piri Reis Üniversitesi Blockchain Kulübü'nün (PRU Blockchain) resmi "AI Mentor"üsün.
Öğrencilere Web3, Blokzincir, Kriptografi, Akıllı Sözleşmeler ve Piri Reis vizyonuna uygun olarak Denizcilik/Lojistikte RWA ve blokzincir kullanım alanlarını interaktif öğretiyorsun.

PRU BLOCKCHAIN KULÜBÜ HACKATHON KURALLARI VE BİLGİSİ:
• Tema: "PRU Blockchain Kulübü'nün gerçekten kullanacağı bir ürün geliştir." Müşteri kulübün kendisidir.
• Değerlendirme: 3 eşit parçadır (Jüri 1/3, Yapay Zeka 1/3, Katılımcılar 1/3). Final = (Jüri + AI + Katılımcı) / 3.
• Onchain Bonusu (0-10): Sözleşme testnet'e deploy edilmiş, arayüze bağlı ve ürüne gerçek değer katıyorsa 10 tam puan verilir.
• Kurallar: Kod hackathon süresinde yazılır, yapay zeka araçları ve açık kaynak serbesttir. README 10 zorunlu başlığı içermelidir.
• Eğer öğrenci veya jüri hackathon, puanlama veya kurallarla ilgili soru sorarsa bu resmi rehbere göre doğrudan ve net cevap ver!

Mevcut Ders: ${currentLesson.weekNumber}. Hafta: ${currentLesson.title}
Kategori: ${currentLesson.category}
Anahtar Kavramlar: ${currentLesson.keyConcepts.join(", ")}
Özet: ${currentLesson.summary}

Kuralların:
1. Kesinlikle hazır/kalıp yanıt verme! Öğrencinin yazdığı soruya/cümleye doğrudan ve derinlemesine yanıt ver.
2. Açıklamalarında somut benzetmeler ve örnekler kullan (örneğin dijital noter, otomat makinesi, gemi konşimentosu).
3. 2-3 kısa paragrafta veya maddelerle, akıcı ve Türkçe bir dille yanıtla.
4. Yanıtının sonuna öğrencinin düşünmesini sağlayacak tek cümlelik interaktif bir soru ekle.`;

    // ACTION: SYNTHESIZE NOTES
    if (action === "synthesize_notes") {
      const synthesizePrompt = `Öğrencinin bu haftaki öğrenme diyaloğu ve soruları şunlar:\n"${message}"\n
Lütfen bu öğrenci için ${currentLesson.weekNumber}. Hafta (${currentLesson.title}) konusu hakkında kişiselleştirilmiş 3 maddelik resmi bir öğrenme özeti çıkar.
Format tam olarak şöyle olsun:
📘 [AI ÖĞRENME ÖZETİ - ${currentLesson.weekNumber}. HAFTA]: ${currentLesson.title}

1. İncelenen Temel Kavramlar:
• (öğrencinin tartıştığı kavramlar)

2. Öğrenci Analizi ve Çıkarımları:
• (öğrencinin diyalogda kavradığı ana fikir ve sorduğu kritik sorular)

3. Sonuç & Doğrulama:
• Öğrenci bu haftanın kazanımlarını başarıyla kavramıştır. Sonraki modül açılabilir.`;

      const dynamicSummary = await callRealLLM(systemPrompt, synthesizePrompt, history);

      const finalNote =
        dynamicSummary ||
        `📘 [AI ÖĞRENME ÖZETİ - ${currentLesson.weekNumber}. HAFTA]: ${currentLesson.title}

1. İncelenen Temel Kavramlar:
• ${currentLesson.keyConcepts.slice(0, 3).join(", ")} konuları incelendi.
• ${currentLesson.summary}

2. Öğrenci Analizi ve Çıkarımları:
• "${message.trim() || "Öğrenci konuyu AI Mentor ile interaktif olarak tartıştı ve temel mekanizmaları kavradı."}"

3. Sonuç & Doğrulama:
• Öğrenci bu modülün tüm gereksinimlerini tamamlamıştır. Bir sonraki haftanın kilidi açılmıştır.`;

      return NextResponse.json({
        response: `Harika bir çalışma oldu! 🎉 Seninle konuştuğumuz detayları analiz ettim ve ${currentLesson.weekNumber}. haftanın resmi öğrenme notunu çıkardım. Yönetim paneline iletildi ve bir sonraki haftanın kilidi açıldı! 🚀`,
        isSummaryProposal: true,
        proposedNotes: finalNote,
      });
    }

    // REGULAR CHAT INTERACTION
    const dynamicReply = await callRealLLM(systemPrompt, message, history);

    if (dynamicReply) {
      return NextResponse.json({
        response: dynamicReply,
        isSummaryProposal: false,
      });
    }

    // Contextual intelligent fallback if network is completely off
    return NextResponse.json({
      response: `Harika bir soru sordun: "${message}". ${currentLesson.title} kapsamında bu konu tam olarak merkeziyetsizliğin ve doğrulanabilirliğin temelini oluşturur. Bunun sence Piri Reis ekosisteminde en somut yansıması nedir?`,
      isSummaryProposal: false,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { response: "Üzgünüm, yanıt üretilirken bir gecikme oldu. Lütfen tekrar sor." },
      { status: 500 }
    );
  }
}
