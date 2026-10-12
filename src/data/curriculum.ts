import { WeekLesson } from "@/lib/types";

export const PRU_CURRICULUM: WeekLesson[] = [
  {
    id: 1,
    weekNumber: 1,
    title: "Blokzincir Temelleri & Konsensüs Mekanizmaları",
    duration: "1. Hafta (Tahmini 2 Saat)",
    category: "Temel Seviye",
    summary:
      "Merkeziyetsizlik kavramı, blok yapısı, hash fonksiyonları (SHA-256) ve ağın güvenliğini sağlayan PoW (Proof of Work) ile PoS (Proof of Stake) mutabakat protokolleri.",
    keyConcepts: [
      "Merkeziyetsiz Defter (DLT)",
      "Kriptografik Hash (SHA-256)",
      "Proof of Work (Bitcoin)",
      "Proof of Stake (Ethereum)",
      "Blok Yapısı ve Merkle Ağacı",
    ],
    readingMaterial: `### 📖 1. Hafta Çalışma Rehberi

Blokzincir, merkezi bir otoriteye (banka, sunucu, şirket) ihtiyaç duymadan, ağdaki tüm katılımcıların aynı defterin kopyasını tuttuğu dağıtık ve şifrelenmiş bir veri tabanıdır.

1. **Hash Mantığı:** Girdi ne olursa olsun (tek bir harf ya da koca bir ansiklopedi), matematiksel bir algoritma sabit uzunlukta benzersiz bir parmak izi üretir. En ufak bir virgül değişirse tüm hash değişir.
2. **Blokların Zincirlenmesi:** Her yeni blok, bir önceki bloğun hash'ini içinde taşır. Bu sayede geçmişteki bir işlemi değiştirmek isterseniz, ondan sonraki tüm blokları yeniden hesaplamanız gerekir ki bu pratikte imkansızdır.
3. **Konsensüs:** Ağa yeni bir blok eklerken kimin söz sahibi olacağını belirler. Bitcoin yüksek işlem gücüyle (PoW) bunu çözerken, modern ağlar (Ethereum vb.) kilitlenen varlık miktarıyla (PoS) çok daha düşük enerjiyle çözer.`,
    interactiveChallenge: {
      prompt:
        "Öğrendiklerini pekiştirmek için AI Mentora 'Bitcoin neden Proof of Stake'e geçmiyor?' ya da 'Hash değişirse blokzincirde ne olur?' diye sorarak konuyu tartış.",
      starterHint:
        "İpucu: AI Mentor'a 'Sence PoW mu daha güvenli yoksa PoS mu?' sorusunu yöneltip tartışmayı başlatabilirsin.",
      sampleDiscussionQuestion:
        "Proof of Work ile Proof of Stake arasındaki en temel güvenlik ve enerji farkı nedir?",
    },
    rewardXP: 100,
  },
  {
    id: 2,
    weekNumber: 2,
    title: "Kriptografik Cüzdanlar, Private Key & Web3 Güvenliği",
    duration: "2. Hafta (Tahmini 2.5 Saat)",
    category: "Güvenlik & Pratik",
    summary:
      "Web3'te kimlik nasıl çalışır? Asimetrik şifreleme (Public/Private Key), 12/24 kelimelik Seed Phrase, soğuk ve sıcak cüzdanlar ve phishing saldırılarından korunma.",
    keyConcepts: [
      "Public Key vs Private Key",
      "Seed Phrase (BIP-39)",
      "Custodial vs Non-Custodial",
      "İmza Atma (Sign Message/Transaction)",
      "Akıllı Sözleşme Onayları & Güvenlik",
    ],
    readingMaterial: `### 📖 2. Hafta Çalışma Rehberi

Web3 dünyasında "kullanıcı adı ve şifre" yoktur. Bunun yerine kriptografik anahtar çiftiniz vardır.

1. **Public Key (Açık Adres):** IBAN numaranız gibidir. Herkese verebilirsiniz, fon göndermek için kullanılır.
2. **Private Key (Gizli Anahtar):** Kasanızın anahtarı ve imzanızdır. Bunu bilen kişi fonlarınızın gerçek sahibidir ("Not your keys, not your crypto").
3. **Seed Phrase (Kurtarma Kelimeleri):** 12 veya 24 İngilizce kelimeden oluşan, tüm hesaplarınızı türeten matematiksel köktür. Asla internete, ekran görüntüsüne ya da bir başkasına verilmez!
4. **Non-Custodial Özgürlüğü:** MetaMask, Rabby gibi cüzdanlarda paranızı hiçbir borsa tutmaz; blokzincirdeki varlığınızı sadece siz yönetirsiniz.`,
    interactiveChallenge: {
      prompt:
        "AI Mentora 'Birine Public Key'imi verirsem paramı çalabilir mi?' ya da 'Seed Phrase'imi kaybedersem MetaMask müşteri hizmetleri bana yardım edebilir mi?' sorularını sorarak tartış.",
      starterHint:
        "İpucu: AI Mentor'a 'Non-custodial cüzdan ile borsa cüzdanı arasındaki farkı bir benzetmeyle anlat' de.",
      sampleDiscussionQuestion:
        "Seed phrase ile Private Key arasındaki fark nedir ve neden kimseyle paylaşılmamalıdır?",
    },
    rewardXP: 150,
  },
  {
    id: 3,
    weekNumber: 3,
    title: "Akıllı Sözleşmeler (Smart Contracts) & EVM Mimarisi",
    duration: "3. Hafta (Tahmini 3 Saat)",
    category: "Teknik Giriş",
    summary:
      "Ethereum Virtual Machine (EVM) nedir? Solidity dilinin temelleri, kodun blokzincirde değiştirilemez şekilde çalışması, Gas ücretleri ve State mantığı.",
    keyConcepts: [
      "Ethereum Virtual Machine (EVM)",
      "Solidity Sözleşme Mantığı",
      "Gas & Gas Limit / Gas Price",
      "Immutability (Değiştirilemezlik)",
      "Layer 2 Ağları (Arbitrum, Base, Optimism)",
    ],
    readingMaterial: `### 📖 3. Hafta Çalışma Rehberi

Bitcoin sadece dijital para transferi yapabilirken, Ethereum blokzinciri üzerine "dünya bilgisayarı" kurmuştur.

1. **Akıllı Sözleşme Nedir?:** Blokzincire yüklenmiş ve belirli koşullar sağlandığında otomatik çalışan kod parçasıdır (Örn: "A takımı kazanırsa parayı X cüzdanına gönder").
2. **EVM (Ethereum Sanal Makinesi):** Tüm Ethereum düğümlerinin çalıştırdığı ortak sanal işletim sistemidir.
3. **Gas Mantığı:** Ağda yapılan her hesaplama ve depolama işlemi ağ kaynaklarını tüketir. Spam saldırılarını önlemek için her işlem 'Gas' birimiyle ücretlendirilir.
4. **Layer 2 (L2):** Ethereum'un güvenliğini kullanarak işlemleri çok daha ucuz ve hızlı yapan yan ağlardır (Arbitrum, Optimism, Base).`,
    interactiveChallenge: {
      prompt:
        "AI Mentora 'Akıllı sözleşmede bir hata (bug) olursa sonradan düzeltilebilir mi?' ya da 'Gas ücreti neden sürekli değişir?' diye sor.",
      starterHint:
        "İpucu: AI Mentor'a 'Akıllı sözleşmeleri bir otomat makinesine benzeterek açıkla' de.",
      sampleDiscussionQuestion:
        "Akıllı sözleşmeler neden geleneksel sunucu yazılımlarından daha güvenilir ama aynı zamanda risklidir?",
    },
    rewardXP: 200,
  },
  {
    id: 4,
    weekNumber: 4,
    title: "DeFi, DAO Yönetişimi & Gerçek Dünya Blokzincir Uygulamaları",
    duration: "4. Hafta (Tahmini 2 Saat)",
    category: "İleri Seviye & Mezuniyet",
    summary:
      "Merkeziyetsiz Finans (DeFi), DAO'ların oy mekanizmaları, RWA (Real World Assets) ve Piri Reis vizyonuyla denizcilik/lojistikte blokzincir kullanım alanları.",
    keyConcepts: [
      "DeFi (DEX'ler, Likidite Havuzları)",
      "DAO (Merkeziyetsiz Otonom Organizasyon)",
      "RWA (Real World Assets) & Tokenizasyon",
      "Soulbound Token (SBT) & Onchain İtibar",
      "Lojistik & Konşimento Blokzincir Entegrasyonu",
    ],
    readingMaterial: `### 📖 4. Hafta Çalışma Rehberi (Mezuniyet Modülü)

Web3'ün gerçek dünyadaki somut faydalarına ulaştık!

1. **DeFi (Decentralized Finance):** Bankalara ihtiyaç duymadan Uniswap gibi AMM'ler üzerinden takas yapmak, Aave üzerinden teminatlı borç alıp vermek.
2. **DAO Yönetişimi:** Şirket patronları yerine token sahiplerinin teklif verip oyladığı şeffaf kulüp ve protokol yönetimleri.
3. **RWA (Gerçek Dünya Varlıkları):** Gayrimenkul, altın ya da Piri Reis Üniversitesi odağında **denizcilik konşimentoları ve gemi yük taşımacılığı belgelerinin** blokzincirde doğrulanması.
4. **SBT (Soulbound Token):** Başka birine satılamayan veya transfer edilemeyen, kişinin doğrudan başarısını ve itibarını kanıtlayan onchain sertifikalar.`,
    interactiveChallenge: {
      prompt:
        "Tebrikler son haftadasın! AI Mentora 'Bir üniversite kulübü nasıl DAO gibi yönetilebilir?' ya da 'Denizcilik lojistiğinde blokzincir hangi sahtekarlığı önler?' diye sorarak mezuniyet özetini hazırla.",
      starterHint:
        "İpucu: AI Mentor'dan tüm 4 haftalık eğitimi özetleyen bir bitirme karnesi iste.",
      sampleDiscussionQuestion:
        "Soulbound Token (SBT) kavramı neden normal NFT'lerden farklıdır ve üniversite diplomaları için neden daha uygundur?",
    },
    rewardXP: 300,
  },
];
