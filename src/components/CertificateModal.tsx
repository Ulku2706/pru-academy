"use client";

import React, { useState } from "react";
import { StudentProgress } from "@/lib/types";
import {
  CONTRACT_CONFIG,
  generateExplorerTxUrl,
  generateExplorerAddressUrl,
  generateDemoTxHash,
} from "@/lib/web3";
import {
  X,
  Award,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  Copy,
  Loader2,
  Sparkles,
  Lock,
} from "lucide-react";
import confetti from "canvas-confetti";

interface CertificateModalProps {
  student: StudentProgress;
  isOpen: boolean;
  onClose: () => void;
  onClaimSuccess: (txHash: string, tokenId: string) => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  student,
  isOpen,
  onClose,
  onClaimSuccess,
}) => {
  const [isMinting, setIsMinting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isEligible = student.completedWeeks.length >= 4;
  const isClaimed = student.certificateClaimed;

  const handleMintCertificate = async () => {
    setIsMinting(true);
    try {
      // Simulate onchain transaction delay
      await new Promise((resolve) => setTimeout(resolve, 1800));

      const txHash = generateDemoTxHash();
      const tokenId = "#14";

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch (e) {}

      onClaimSuccess(txHash, tokenId);
    } catch (e) {
      console.error(e);
    } finally {
      setIsMinting(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_CONFIG.contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const txHashToDisplay =
    student.certificateTxHash || "0x9c41d7e28b4931a541097fa6e921d743b1859b814a601e23f7743d84218a09b2";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-gray-950 border border-gray-800 rounded-3xl flex flex-col shadow-2xl overflow-hidden ring-1 ring-white/15">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">PRU Onchain Soulbound Diploma (SBT)</h3>
              <p className="text-xs text-gray-400">Doğrulanabilir Web3 Başarı Sertifikası</p>
            </div>
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
          {/* Certificate Card Preview */}
          <div className="relative rounded-2xl bg-gradient-to-br from-blue-950 via-gray-900 to-indigo-950 border-2 border-amber-500/40 p-6 sm:p-8 text-center shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Crest & Title */}
            <div className="flex items-center justify-center space-x-2 mb-3">
              <span className="text-2xl">⚓</span>
              <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                PİRİ REİS ÜNİVERSİTESİ BLOCKCHAIN KULÜBÜ
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase mb-1">
              Web3 Akademi Başarı Belgesi
            </h2>
            <p className="text-xs text-cyan-300 font-medium mb-6">
              Proof-of-Learning Soulbound Token (Devredilemez Dijital Kimlik)
            </p>

            {/* Recipient info */}
            <div className="bg-gray-950/60 border border-gray-800/80 rounded-xl py-4 px-6 mb-6">
              <p className="text-xs text-gray-400 mb-1">Bu belge, 4 haftalık yoğun programı başarıyla tamamlayan:</p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
                {student.name}
              </h3>
              <p className="text-xs text-gray-400 mt-1">Öğrenci No: {student.studentNo}</p>
            </div>

            {/* Certified Topics */}
            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300 mb-6">
              <div className="bg-gray-900/60 p-2 rounded-lg border border-gray-800">
                ✓ Blokzincir & PoS Konsensüsü
              </div>
              <div className="bg-gray-900/60 p-2 rounded-lg border border-gray-800">
                ✓ Kriptografik Cüzdan Güvenliği
              </div>
              <div className="bg-gray-900/60 p-2 rounded-lg border border-gray-800">
                ✓ Akıllı Sözleşmeler & EVM
              </div>
              <div className="bg-gray-900/60 p-2 rounded-lg border border-gray-800">
                ✓ DeFi, DAO & Lojistik RWA
              </div>
            </div>

            {/* Stamp and metadata footer */}
            <div className="flex items-center justify-between text-left pt-4 border-t border-gray-800 text-xs">
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Ağ & Standart</p>
                <p className="font-semibold text-gray-300">{CONTRACT_CONFIG.networkName} (ERC-721 SBT)</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase">Token ID</p>
                <p className="font-bold text-amber-400">
                  {student.certificateTokenId || "#14 (Soulbound)"}
                </p>
              </div>
            </div>
          </div>

          {/* Onchain Details Box */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 text-xs space-y-2.5">
            <div className="flex items-center justify-between text-gray-400">
              <span>Akıllı Sözleşme Adresi:</span>
              <button
                onClick={copyAddress}
                className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300"
              >
                <span>{CONTRACT_CONFIG.contractAddress.slice(0, 10)}...{CONTRACT_CONFIG.contractAddress.slice(-8)}</span>
                <Copy className="w-3.5 h-3.5" />
                {copied && <span className="text-[10px] text-emerald-400">Kopyalandı</span>}
              </button>
            </div>

            <div className="flex items-center justify-between text-gray-400">
              <span>Sözleşmeyi İncele (Explorer):</span>
              <a
                href={generateExplorerAddressUrl(CONTRACT_CONFIG.contractAddress)}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline flex items-center space-x-1"
              >
                <span>Arbiscan Explorer</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {isClaimed && (
              <div className="flex items-center justify-between text-gray-400 pt-2 border-t border-gray-800">
                <span>İşlem Kanıtı (Tx Hash):</span>
                <a
                  href={generateExplorerTxUrl(txHashToDisplay)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline flex items-center space-x-1 font-mono"
                >
                  <span>{txHashToDisplay.slice(0, 12)}...{txHashToDisplay.slice(-8)}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* Why Soulbound Explanation */}
          <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-gray-300 flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-cyan-400 mb-0.5">Neden Soulbound Token (SBT)?</p>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Bu sertifika devredilemez ve satılamaz. Yalnızca senin cüzdan adresine bağlı kalır.
                Böylece CV'ne eklediğinde şirketler ve sponsorlar blokzincir üzerinden başarını bağımsız olarak doğrulayabilir.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-gray-900 border-t border-gray-800 flex items-center justify-between">
          <div className="text-xs text-gray-400">
            {isClaimed ? (
              <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Onchain Sertifikanız Cüzdanda Kayıtlı</span>
              </span>
            ) : isEligible ? (
              <span className="text-amber-400 font-semibold">Tüm şartlar sağlandı! Mint etmeye hazırsınız.</span>
            ) : (
              <span className="flex items-center space-x-1 text-gray-500">
                <Lock className="w-4 h-4" />
                <span>Önce tüm 4 haftayı tamamlamalısın ({student.completedWeeks.length}/4)</span>
              </span>
            )}
          </div>

          <div>
            {isClaimed ? (
              <a
                href={generateExplorerTxUrl(txHashToDisplay)}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-600/20"
              >
                <span>İşlemi Explorer'da Gör</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : isEligible ? (
              <button
                onClick={handleMintCertificate}
                disabled={isMinting}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
              >
                {isMinting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sözleşmeye Yazılıyor...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>SBT Sertifikasını Mint Et (Gasless)</span>
                  </>
                )}
              </button>
            ) : (
              <button
                disabled
                className="px-4 py-2 bg-gray-800 text-gray-500 font-semibold text-xs rounded-xl cursor-not-allowed"
              >
                Aşama Tamamlanmadı
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
