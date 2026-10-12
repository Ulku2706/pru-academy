# PRU AI-Academy (Proof-of-Learning & Interactive Web3 Onboarding)

## 1. Problem
Kulüpte yazın yaşanan ve yeni dönemde de her eğitim programında tekrarlanan en büyük kriz: **"Görünürlük Yokluğu (Hayalet Üye / Ghosting)" ve "Ödev Sendromu"dur.**
* **Bugün bu iş nasıl yapılıyor?:** Kulüp üyeleri için bir eğitim/öğrenme programı başlatıldığında kimseden haber alınamıyor; kimin ilerlediği, kimin nerede takıldığı veya eğitimi bıraktığı yönetim tarafından takip edilemiyor.
* **Mevcut çözümün tıkanma noktası:** Kulüp bu sorunu çözmek için "1. haftanın notları yazılmadan 2. haftaya geçilemez" kuralını getirdi; ancak bu sefer de öğrenciler uzun notlar yazmayı bir **angarya/ekstra okul ödevi** gibi gördüğü için platforma girmemeye başladı. Sonuç olarak üyeler takıldıkları yerde yalnız kaldı ve eğitim süreci kesintiye uğradı.

---

## 2. Çözüm
**Tek Cümlelik Özet:** Öğrencilerin not yazma sürtünmesini yapay zeka mentoruyla sohbet ederek kaldıran, her aşamayı ilerleme kanıtıyla açan ve eğitimi bitirenlere devredilemez Soulbound (SBT) başarı rozeti basan interaktif kulüp akademisi.

**Ana Kullanıcı Akışı:**
1. **Dersi İncele & Tartış:** Öğrenci haftalık konuyu (ör. Blokzincir Temelleri veya Cüzdan Güvenliği) inceler ve platformdaki entegre **PRU AI Mentor**'a takıldığı soruları sorar.
2. **Sohbetle Not Çıkar & Kilidi Aç:** Öğrenci uzun uzun ödev yazmak yerine *"AI ile Öğrenme Özetimi Hazırla ve Kilidi Aç"* butonuna tıklar. AI, diyalogdan öğrencinin 3 maddelik resmi notunu çıkarıp sisteme kaydeder, +XP kazandırır ve **bir sonraki haftanın kilidini anında açar**.
3. **Sosyal Rekabet (Liderlik Tablosu):** Notunu teslim eden öğrenci, kulüp içi liderlik tablosunda yükselir, streak (seri) kazanır ve kulübün dönem sonu etkinlik/staj ödüllerine hak kazanır.
4. **Onchain Mezuniyet Belgesi (SBT):** 4 haftayı başarıyla tamamlayan öğrenci, Arbitrum Sepolia ağında kendi adına doğrulanabilir, devredilemez **Soulbound Token (SBT)** başarı diplomasını mint eder.
5. **Yönetici Radarı:** Kulüp yönetimi kimin hangi haftada tıkandığını, AI Mentora en çok hangi soruların sorulduğunu görerek takılan öğrencilere doğrudan destek verir ve bir sonraki fiziksel atölye konusunu buna göre planlar.

---

## 3. Kim kullanacak?
* **Kulüp Üyeleri & Yeni Katılan Öğrenciler:** Haftada 2-3 kez girerek o haftanın ders materyalini inceler, AI Mentor ile tartışır, notunu onaylatıp sonraki haftanın kilidini açar ve liderlik tablosundaki sırasını takip eder.
* **Kulüp Yönetim Kurulu (Admin):** Haftalık yönetim toplantılarında "Yönetici Radarı"nı açarak 48 üyenin ilerleme hunisini, 4+ gündür takılan öğrencileri ve en çok sorulan konuları analiz eder.

---

## 4. Özellikler

### Çalışanlar (Tamamlananlar)
* ✅ **Aşama Kilit Sistemi (Progress Gatekeeper):** 1. haftanın notu teslim edilmeden 2. haftanın kilidinin açılmasını engelleyen dinamik durum yönetimi.
* ✅ **PRU AI Mentor (Entegre Chatbot):** Web3 konularına hakim, pedagojik açıklamalar yapan ve öğrenciyle karşılıklı kavram tartışması yürüten sohbet motoru.
* ✅ **AI Not Sentezi & Tek Tıkla Kilit Açma:** Öğrencinin konuşmalarından ve kazanımlarından 3 maddelik resmi özet notu üretip sisteme kaydeden ve bir sonraki haftanın kilidini açan mekanizma.
* ✅ **Kulüp Liderlik Tablosu (Leaderboard):** XP, tamamlanan hafta sayısı ve günlük streak takibiyle sosyal teşvik sağlayan şeffaf sıralama.
* ✅ **Yönetici Radarı (Admin Dashboard):** Aşama aşama öğrenci dağılımı hunisi, 4+ gündür takılan üyelere yönelik alarm listesi ve AI'a en çok sorulan soruların pedagojik analizi.
* ✅ **Soulbound Token (SBT) Akıllı Sözleşmesi:** Arbitrum Sepolia testnetinde çalışan, devredilemez (non-transferable) ERC-721 başarı sertifikası sözleşmesi (`contracts/PRUCertificate.sol`).
* ✅ **Onchain Explorer Entegrasyonu:** Sertifika mint edildiğinde tx hash üretimi, token ID ataması ve Arbiscan blok gezgini link doğrulaması.
* ✅ **Demo Sıfırlama & Hızlı İlerleme Modu:** Canlı sunumda jüriye tüm akışı baştan sona ya da tek tıkla son aşamayı gösterebilmek için hızlı demo yardımcıları.

### Yarım Kalanlar
* ⚠️ **Otomatik WhatsApp Bildirimi:** Yönetici radarında "WhatsApp'tan Dürt" butonu arayüzde çalışmakta olup, harici WhatsApp Business Cloud API entegrasyonu yerine kullanıcıyı hazır mesaj taslağıyla yönlendirme aşamasında bırakılmıştır.

### Planlananlar
* 📌 **Sesli AI Mentor:** Öğrencilerin mobilde yürürken sesli soru sorup podcast tadında yanıt dinleyebileceği WebRTC ses katmanı.
* 📌 **DAO Snapshot Bağlantısı:** SBT sertifikasına sahip mezun üyelerin kulübün yönetim oylamalarında ekstra oy ağırlığına sahip olması.

---

## 5. Teknik yapı

### Kullanılan Teknolojiler
* **Frontend / Framework:** Next.js 14 (App Router), React 18, TypeScript
* **Stil & Arayüz:** Tailwind CSS, Glassmorphism Web3 Dark Theme, Lucide Icons, Canvas-Confetti
* **Akıllı Sözleşme (Smart Contract):** Solidity ^0.8.20 (ERC-721 Soulbound Token standardı)
* **Web3 Kütüphaneleri:** Ethers.js v6
* **Durum Yönetimi & Kalıcılık:** LocalStorage API (çevrimdışı çalışabilir, demo sırasında sunucu kesintisi yaşamaz)
* **Backend API:** Next.js Route Handlers (`/api/chat`)

### Klasör Yapısı
```
pru-ai-academy/
├── contracts/
│   ├── PRUCertificate.sol        # Soulbound Token (SBT) akıllı sözleşmesi
│   └── scripts/
│       └── deploy.js             # Testnet dağıtım betiği
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/route.ts     # AI Mentor & Not Sentez API servisi
│   │   ├── globals.css           # Web3 teması ve glow efektleri
│   │   ├── layout.tsx            # Ana HTML kabuğu ve meta bilgileri
│   │   └── page.tsx              # Durum yönetimi ve sayfa birleştirici
│   ├── components/
│   │   ├── Navbar.tsx            # Başlık, XP/Streak göstergesi ve cüzdan hapı
│   │   ├── StatsBanner.tsx       # İlerleme çubuğu ve 4 temel gösterge
│   │   ├── RoadmapView.tsx       # 4 haftalık aşama kilitli zaman çizelgesi
│   │   ├── WeekDetailModal.tsx   # Ders notları ve kavram açıklamaları
│   │   ├── AIMentorChat.tsx      # Entegre AI Chatbot ve not sentezleyici
│   │   ├── LeaderboardView.tsx   # Şampiyonlar podyumu ve üye tablosu
│   │   ├── AdminRadarView.tsx    # Tıkanan öğrenci radarı ve yönetim masası
│   │   └── CertificateModal.tsx  # Soulbound diploma ve onchain gezgin doğrulaması
│   ├── data/
│   │   ├── curriculum.ts         # 4 haftalık özgün Web3 müfredatı
│   │   └── mockStudents.ts       # Kulüp üyeleri, sıralama ve analiz verileri
│   └── lib/
│       ├── storage.ts            # Kalıcılık ve sıfırlama yardımcıları
│       ├── types.ts              # TypeScript tip tanımları
│       └── web3.ts               # Testnet ve sözleşme yapılandırması
├── .env.example                  # Ortam değişkenleri şablonu
├── package.json
└── tsconfig.json
```

---

## 6. Kurulum ve çalıştırma
Proje standart Node.js ortamında **5 dakikadan kısa sürede** kurulup çalıştırılabilir:

### 1. Depoyu klonlayın ve klasöre girin:
```bash
git clone <repo-url>
cd block
```

### 2. Bağımlılıkları yükleyin:
```bash
npm install
```

### 3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

### 4. Tarayıcıda açın:
Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

*(İsteğe bağlı)* Ortam değişkenleri için `.env.example` dosyasını `.env.local` olarak kopyalayabilirsiniz; ancak harici hiçbir anahtar olmadan da sistem yerleşik motoruyla eksiksiz ve canlı demoya hazır şekilde çalışır.

---

## 7. Onchain kısım
* **Ağ Adı:** Arbitrum Sepolia Testnet
* **Sözleşme Adı:** PRUCertificate (PRU-SBT)
* **Sözleşme Adresi:** `0x3B89a4Fc5C4e8C5996b27E21b44B2720d29188F3`
* **Explorer Linki:** [https://sepolia.arbiscan.io/address/0x3B89a4Fc5C4e8C5996b27E21b44B2720d29188F3](https://sepolia.arbiscan.io/address/0x3B89a4Fc5C4e8C5996b27E21b44B2720d29188F3)

### Neden Onchain?
Geleneksel üniversite kulübü sertifikaları (PDF ya da kağıt baskı) kolayca tahrif edilebilir, sahte düzenlenebilir ve üçüncü taraf kurumlarca (staj ve iş veren şirketlerce) doğrudan doğrulanamaz.
Bu projede kullanılan **Soulbound Token (SBT)**:
1. **Devredilemez (Non-transferable):** Başka bir cüzdana satılamaz veya aktarılamaz (`transferFrom` çağrıları kontrat seviyesinde revert eder).
2. **Kalıcı Başarı Kanıtı:** Öğrencinin bizzat 4 haftalık modülü bitirdiğini matematiksel olarak ispatlar.
3. **Şeffaf İtibar:** Mezun öğrenci CV'sine veya LinkedIn'ine cüzdan adresini eklediğinde şirketler Arbiscan üzerinden belgenin gerçekliğini tek tıkla doğrular.

---

## 8. Kulüp bunu nasıl devralır?
* **Yayına Alma:** Proje Next.js tabanlı olduğu için kulübün GitHub hesabına bağlandığında **Vercel** veya **Netlify** üzerinde **0 TL maliyetle** tek tıkla ücretsiz yayına alınabilir.
* **Akıllı Sözleşme:** Testnet sözleşmesi Arbitrum Sepolia üzerinde dağıtılmıştır (musluktan alınan test ETH ile 0 maliyet). Kulüp ileride ana ağa (Arbitrum One veya Base) geçmek isterse işlem başına ~0.01$ gibi ihmal edilebilir bir gas maliyeti oluşur.
* **Bakım & Güncelleme:** `src/data/curriculum.ts` dosyasındaki JSON yapısına yeni haftalar veya konular eklemek için tek bir dosyanın güncellenmesi yeterlidir; kodlama bilgisi gerektirmez.

---

## 9. Hazır kullanılanlar ve yapay zeka kullanımı
* **Açık Kaynak Kütüphaneler:** Next.js 14, Tailwind CSS, Lucide React (ikon seti), Canvas-Confetti (kutlama animasyonları), Ethers.js v6.
* **Yapay Zeka Kullanımı:** 
  - Hackathon kuralları doğrultusunda, projenin fikir mimarisinin oluşturulması, modüler React bileşenlerinin yazılması, TypeScript tiplerinin denetlenmesi ve Solidity Soulbound akıllı sözleşmesinin geliştirilmesinde Google Antigravity / Gemini yapay zeka araçlarından pair-programming desteği alınmıştır.
  - Uygulama içindeki pedagojik AI Mentor yanıt ve özet motoru, kulüp üyelerine özel prompting ve dil modeli mimarisiyle entegre edilmiştir.

---

## 10. Takım
* **PRU Blockchain Kulübü Geliştirme Takımı**
  - **Fikir & Ürün Tasarımı:** Kulüp içi eğitim tıkanıklığı deneyiminin tespiti, mentor diyalog akışı ve liderlik tablosu mekanizması.
  - **Yapay Zeka & Prompt Mühendisliği:** AI Mentor pedagojik yanıt motoru, not sentezleme algoritmaları ve sistem mimarisi.
  - **Frontend & Web3 Entegrasyonu:** Next.js bileşenleri, Soulbound Token akıllı sözleşmesi ve testnet explorer doğrulaması.
