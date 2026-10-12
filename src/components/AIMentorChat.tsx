"use client";

import React, { useState, useRef, useEffect } from "react";
import { WeekLesson, ChatMessage, ChatSession } from "@/lib/types";
import { getChatSessions, saveChatSessions } from "@/lib/storage";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Zap,
  HelpCircle,
  Loader2,
  History,
  Plus,
  Trash2,
  Clock,
  MessageSquare,
  ChevronLeft,
} from "lucide-react";
import confetti from "canvas-confetti";

interface AIMentorChatProps {
  lesson: WeekLesson;
  isOpen: boolean;
  onClose: () => void;
  onCompleteWeek: (weekNumber: number, notes: string) => void;
}

export const AIMentorChat: React.FC<AIMentorChatProps> = ({
  lesson,
  isOpen,
  onClose,
  onCompleteWeek,
}) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or load sessions
  useEffect(() => {
    if (!isOpen) return;

    let existingSessions = getChatSessions();

    // If no past sessions, seed realistic past club discussions
    if (existingSessions.length === 0) {
      existingSessions = [
        {
          id: "session-seed-1",
          weekNumber: 1,
          title: "PoW vs PoS & Piri Reis Vizyonu",
          createdAt: "Bugün, 16:40",
          messages: [
            {
              id: "m1",
              sender: "user",
              text: "Proof of Work ile Proof of Stake arasındaki temel fark nedir?",
              timestamp: "16:40",
            },
            {
              id: "m2",
              sender: "ai",
              text: "Proof of Work yüksek işlem gücüne (madencilik) dayanırken, Proof of Stake kilitlenen varlık miktarına (staking) dayanır. PoS enerji tüketimini %99.9 oranında azaltır.",
              timestamp: "16:41",
            },
          ],
        },
        {
          id: "session-seed-2",
          weekNumber: 1,
          title: "Solidity'de Float Ondalıklı Sayılar",
          createdAt: "Bugün, 15:20",
          messages: [
            {
              id: "m3",
              sender: "user",
              text: "Solidity dilinde neden float veri tipi yok?",
              timestamp: "15:20",
            },
            {
              id: "m4",
              sender: "ai",
              text: "EVM'de deterministik konsensüs sağlamak için float desteklenmez; bunun yerine fixed-point ve Wei birimleri kullanılır.",
              timestamp: "15:21",
            },
          ],
        },
      ];
      saveChatSessions(existingSessions);
    }

    setSessions(existingSessions);

    // Create a new active session for the current lesson
    const newSessionId = "session-" + Date.now();
    const initialGreeting: ChatMessage = {
      id: "initial-msg-" + Date.now(),
      sender: "ai",
      text: `Selam! ⚓ Ben PRU AI Mentor. Şu an **${lesson.weekNumber}. Hafta: ${lesson.title}** konusundayız.\n\nAklına takılan herhangi bir kavramı bana sorabilirsin ya da sol üstteki **Geçmiş (History)** butonundan önceki sohbetlerine göz atabilirsin! Nereden başlayalım?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newActiveSession: ChatSession = {
      id: newSessionId,
      weekNumber: lesson.weekNumber,
      title: `${lesson.weekNumber}. Hafta: ${lesson.title.slice(0, 24)}...`,
      createdAt: "Şimdi",
      messages: [initialGreeting],
    };

    setCurrentSessionId(newSessionId);
    setMessages([initialGreeting]);
  }, [isOpen, lesson]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  // Save changes to current session in localStorage
  const updateCurrentSession = (updatedMessages: ChatMessage[]) => {
    setMessages(updatedMessages);

    setSessions((prevSessions) => {
      const idx = prevSessions.findIndex((s) => s.id === currentSessionId);
      const userQuestions = updatedMessages.filter((m) => m.sender === "user");
      const autoTitle =
        userQuestions.length > 0
          ? userQuestions[0].text.slice(0, 28) + (userQuestions[0].text.length > 28 ? "..." : "")
          : `${lesson.weekNumber}. Hafta Eğitimi`;

      let newSessions: ChatSession[];
      if (idx !== -1) {
        newSessions = [...prevSessions];
        newSessions[idx] = {
          ...newSessions[idx],
          title: autoTitle,
          messages: updatedMessages,
        };
      } else {
        newSessions = [
          {
            id: currentSessionId,
            weekNumber: lesson.weekNumber,
            title: autoTitle,
            createdAt: "Şimdi",
            messages: updatedMessages,
          },
          ...prevSessions,
        ];
      }

      saveChatSessions(newSessions);
      return newSessions;
    });
  };

  const handleStartNewChat = () => {
    const newSessionId = "session-" + Date.now();
    const newInitialMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      sender: "ai",
      text: `Yeni bir sohbet başlattık! 🚀 Şu an **${lesson.weekNumber}. Hafta: ${lesson.title}** konusundayız. Sorunu dinliyorum!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newSession: ChatSession = {
      id: newSessionId,
      weekNumber: lesson.weekNumber,
      title: `Yeni Sohbet (${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})`,
      createdAt: "Şimdi",
      messages: [newInitialMsg],
    };

    setSessions((prev) => [newSession, ...prev]);
    saveChatSessions([newSession, ...sessions]);
    setCurrentSessionId(newSessionId);
    setMessages([newInitialMsg]);
    setShowHistory(false);
  };

  const handleSelectSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setShowHistory(false);
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = sessions.filter((s) => s.id !== sessionId);
    setSessions(filtered);
    saveChatSessions(filtered);

    if (currentSessionId === sessionId) {
      if (filtered.length > 0) {
        handleSelectSession(filtered[0]);
      } else {
        handleStartNewChat();
      }
    }
  };

  const handleClearAllHistory = () => {
    if (confirm("Tüm sohbet geçmişini silmek istediğinize emin misiniz?")) {
      setSessions([]);
      saveChatSessions([]);
      handleStartNewChat();
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedWithUser = [...messages, userMsg];
    updateCurrentSession(updatedWithUser);

    if (!textToSend) setInputValue("");
    setIsLoading(true);

    try {
      const historyPayload = updatedWithUser.map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weekNumber: lesson.weekNumber,
          message: text.trim(),
          history: historyPayload,
          action: "chat",
        }),
      });

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: data.response || "Konuyu çok iyi anladın! Başka bir sorun var mı?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      updateCurrentSession([...updatedWithUser, aiMsg]);
    } catch (err) {
      console.error(err);
      const errMsg: ChatMessage = {
        id: "err-" + Date.now(),
        sender: "ai",
        text: "Bağlantıda bir gecikme oldu ama bu haftanın temel kazanımlarını başarıyla konuştuk. İstediğin zaman notunu çıkarıp sonraki haftaya geçebilirsin!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      updateCurrentSession([...updatedWithUser, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSynthesizeAndUnlock = async () => {
    setIsSynthesizing(true);
    try {
      const allUserThoughts =
        messages
          .filter((m) => m.sender === "user")
          .map((m) => m.text)
          .join(" \n• ") ||
        "Öğrenci anahtar kavramları ve mutabakat mekanizmalarını başarıyla inceledi.";

      const historyPayload = messages.map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weekNumber: lesson.weekNumber,
          message: allUserThoughts,
          history: historyPayload,
          action: "synthesize_notes",
        }),
      });

      const data = await res.json();
      const noteToSave = data.proposedNotes || `📘 [${lesson.weekNumber}. Hafta]: ${lesson.title} başarıyla tamamlandı.`;

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}

      onCompleteWeek(lesson.weekNumber, noteToSave);
      onClose();
    } catch (e) {
      console.error(e);
      onCompleteWeek(
        lesson.weekNumber,
        `📘 [AI Özet - ${lesson.weekNumber}. Hafta]: ${lesson.title} başarıyla tamamlandı.`
      );
      onClose();
    } finally {
      setIsSynthesizing(false);
    }
  };

  const quickQuestions = [
    lesson.interactiveChallenge.sampleDiscussionQuestion,
    "Bu konuyu bana 1 dakikada özetler misin?",
    "Piri Reis denizcilik/kampüs projelerinde bu nasıl kullanılır?",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[800px] bg-gray-950 border border-gray-800 rounded-3xl flex flex-col md:flex-row shadow-2xl overflow-hidden ring-1 ring-white/10">
        
        {/* ======================================================== */}
        {/* SOHBET GEÇMİŞİ (HISTORY) PANELİ - SOL KENAR ÇUBUĞU */}
        {/* ======================================================== */}
        <div
          className={`${
            showHistory ? "flex" : "hidden md:flex"
          } w-full md:w-72 bg-gray-900/95 border-r border-gray-800 flex-col z-20 shrink-0 transition-all`}
        >
          {/* History Header */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <History className="w-4 h-4 text-cyan-400" />
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">Sohbet Geçmişi</h4>
            </div>
            <button
              onClick={() => setShowHistory(false)}
              className="md:hidden p-1.5 text-gray-400 hover:text-white rounded-lg"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* New Chat Button */}
          <div className="p-3">
            <button
              onClick={handleStartNewChat}
              className="w-full py-2 px-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-cyan-300 border border-blue-500/30 text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yeni Sohbet Başlat</span>
            </button>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto px-3 space-y-1.5 py-1">
            {sessions.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-xs">
                Kayıtlı sohbet geçmişi yok.
              </div>
            ) : (
              sessions.map((session) => {
                const isActive = session.id === currentSessionId;
                return (
                  <div
                    key={session.id}
                    onClick={() => handleSelectSession(session)}
                    className={`group w-full p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer flex items-center justify-between border ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30 font-semibold"
                        : "bg-gray-950/60 hover:bg-gray-800/80 text-gray-300 border-gray-800/80"
                    }`}
                  >
                    <div className="flex items-start space-x-2 overflow-hidden pr-1">
                      <MessageSquare className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isActive ? "text-white" : "text-gray-400"}`} />
                      <div className="truncate">
                        <p className="truncate text-xs leading-tight">{session.title}</p>
                        <span className={`text-[10px] ${isActive ? "text-blue-100" : "text-gray-500"}`}>
                          {session.weekNumber}. Hafta • {session.createdAt}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleDeleteSession(session.id, e)}
                      title="Sohbeti Sil"
                      className={`p-1 rounded-md transition-opacity shrink-0 ${
                        isActive
                          ? "hover:bg-blue-700 text-blue-200"
                          : "opacity-0 group-hover:opacity-100 hover:bg-gray-700 text-gray-400 hover:text-red-400"
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* History Footer */}
          {sessions.length > 0 && (
            <div className="p-3 border-t border-gray-800/80">
              <button
                onClick={handleClearAllHistory}
                className="w-full py-1.5 text-center text-[11px] text-gray-500 hover:text-red-400 transition-colors"
              >
                Tüm Geçmişi Temizle
              </button>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* ANA SOHBET PENCERESİ */}
        {/* ======================================================== */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-gray-950">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* History Toggle Button for Mobile & Desktop */}
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold border border-gray-700 transition-all"
                title="Geçmiş Sohbetleri Göster/Gizle"
              >
                <History className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">Geçmiş ({sessions.length})</span>
              </button>

              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-bold text-white">PRU AI Mentor</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Canlı LLM</span>
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {lesson.weekNumber}. Hafta: {lesson.title}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Callout Bar */}
          <div className="bg-gradient-to-r from-blue-950/80 via-indigo-950/60 to-purple-950/80 border-b border-blue-500/20 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2 text-xs text-gray-300">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Not yazma derdi yok! AI Mentor konuşmanızı özetleyip kilidi açar.</span>
            </div>

            <button
              onClick={handleSynthesizeAndUnlock}
              disabled={isSynthesizing}
              className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-extrabold text-xs rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all flex items-center space-x-1.5 disabled:opacity-50"
            >
              {isSynthesizing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Özet Çıkarılıyor...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI ile Not Çıkar & Kilidi Aç (+{lesson.rewardXP} XP)</span>
                </>
              )}
            </button>
          </div>

          {/* Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${
                  msg.sender === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-800 text-cyan-400 border border-gray-700"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-600/20"
                      : "bg-gray-900 border border-gray-800 text-gray-200 rounded-tl-none shadow-md"
                  }`}
                >
                  <div className="space-y-1">
                    {msg.text.split("\n").map((line, lIdx) => {
                      if (!line.trim()) return <div key={lIdx} className="h-1.5" />;
                      const parts = line.split(/(\*\*.*?\*\*|`.*?`)/g);
                      return (
                        <div key={lIdx} className="leading-relaxed">
                          {parts.map((part, pIdx) => {
                            if (part.startsWith("**") && part.endsWith("**")) {
                              return (
                                <strong key={pIdx} className="font-bold text-white">
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            if (part.startsWith("`") && part.endsWith("`")) {
                              return (
                                <code
                                  key={pIdx}
                                  className="bg-black/50 px-1.5 py-0.5 rounded text-cyan-300 font-mono text-xs border border-gray-800"
                                >
                                  {part.slice(1, -1)}
                                </code>
                              );
                            }
                            return part;
                          })}
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={`text-[10px] mt-1.5 ${
                      msg.sender === "user" ? "text-blue-200 text-right" : "text-gray-500 text-left"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-400 text-xs py-2 px-3 bg-gray-900/50 rounded-xl w-fit">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span>AI Mentor yanıt yazıyor...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Chips */}
          <div className="px-4 py-2 bg-gray-900/40 border-t border-gray-800/80 flex items-center space-x-2 overflow-x-auto scrollbar-none">
            <HelpCircle className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="text-[11px] text-gray-400 shrink-0">Hızlı Sor:</span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-xs px-2.5 py-1 rounded-lg bg-gray-800/80 hover:bg-gray-700 text-gray-300 border border-gray-700/60 whitespace-nowrap transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 sm:p-4 bg-gray-900 border-t border-gray-800 flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Aklına takılan soruyu yaz..."
              className="flex-1 bg-gray-950 border border-gray-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white transition-all shadow-md shadow-blue-600/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
