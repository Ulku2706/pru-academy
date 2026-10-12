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

### Çalışanlar (Canlı / Tamamlananlar)
* ✅ **Aşama Kilit Sistemi (Progress Gatekeeper):** 1. haftanın notu teslim edilmeden 2. haftanın kilidinin açılmasını engelleyen dinamik durum yönetimi.
* ✅ **PRU AI Mentor (Entegre Chatbot):** Web3 konularına hakim, pedagojik açıklamalar yapan ve öğrenciyle karşılıklı kavram tartışması yürüten çok katmanlı gerçek sohbet motoru (ücretsiz uç nokta + fallback mimarisi).
* ✅ **Sohbet Geçmişi (Chat History):** LocalStorage üzerinde kalıcı hafızaya sahip, oturumlar arası geçiş yapılabilen tam işlevli sohbet geçmişi paneli.
* ✅ **AI Not Sentezi & Tek Tıkla Kilit Açma:** Öğrencinin konuşmalarından ve kazanımlarından 3 maddelik resmi özet notu üretip sisteme kaydeden ve bir sonraki haftanın kilidini açan mekanizma.
* ✅ **Soulbound Token (SBT) Güvenli Sözleşmesi:** Arbitrum Sepolia testneti için yazılmış, devredilemez (non-transferable) ERC-721 başarı sertifikası sözleşmesi (`contracts/PRUCertificate.sol`). *Hackathon geri bildirimiyle `issueCertificate` fonksiyonuna `onlyOwner` denetimi eklenerek yetkisiz mint açığı kapatılmıştır.*
* ✅ **Solidity Derleme & Gerçek Deploy Motoru:** `solc` ve `ethers` (v6) ile derleme (`compile.js`) ve canlı testnete işlem gönderen dağıtım altyapısı (`deploy.js`).
* ✅ **Web3 Cüzdan & Ethers Bağlantısı:** Tarayıcı cüzdanı (`window.ethereum`) ve testnet sözleşmesi bağlandığında doğrudan blokzincir çağrısı yapmaya hazır mimari (`src/components/CertificateModal.tsx`).
* ✅ **Demo Sıfırlama & Hızlı İlerleme Modu:** Canlı sunumda veya test sırasında tüm akışı baştan sona ya da tek tıkla son aşamayı gösterebilmek için geliştirici yardımcıları.

### Demo / Simülasyon Kısımları (Prototip Aşamasındakiler)
* ⚠️ **Sertifika Mint Demo Önizlemesi:** Henüz canlı testnete kontrat deploy edilmediğinde veya cüzdan bağlanmadığında arayüz yanıltıcı sahte başarı üretmek yerine açıkça **"Demo Önizleme Modu"** olarak etiketlenir ve örnek bir görsel önizleme sunar.
* ⚠️ **Liderlik Tablosu & Yönetici Radarı Verisi:** 48 kulüp üyesinin aşama dağılımı, XP sıralaması ve tıkanan öğrenci listesi hackathon prototip aşamasında yerel örnek veri dosyasından (`src/data/mockStudents.ts`) okunmaktadır.

### Yarım Kalanlar
* ⚠️ **Otomatik WhatsApp Bildirimi:** Yönetici radarında "WhatsApp'tan Dürt" butonu arayüzde çalışmakta olup, kulüp için merkezi WhatsApp Business Cloud API entegrasyonu yerine kullanıcıyı hazır mesaj taslağıyla yönlendirme aşamasında bırakılmıştır.

### Planlananlar (Kulüp Ürünleştirme Yol Haritası)
* 📌 **Merkezi Bulut Veritabanı (Supabase / PostgreSQL):** Öğrenci ilerleme verilerini yerel durumdan ortak bir veritabanına taşıyarak Yönetici Radarını tüm yönetim kuruluna canlı açmak.
* 📌 **Arbitrum Sepolia / Ana Ağ Resmi Dağıtımı:** Kulüp adına resmi sözleşmeyi zincire çıkarıp doğrulamak (verify contract).
* 📌 **DAO Snapshot Bağlantısı:** SBT sertifikasına sahip mezun üyelerin kulübün yönetim oylamalarında ekstra oy ağırlığına sahip olması.

---

## 5. Teknik yapı

### Kullanılan Teknolojiler
* **Frontend / Framework:** Next.js 14 (App Router), React 18, TypeScript
* **Stil & Arayüz:** Tailwind CSS, Glassmorphism Web3 Dark Theme, Lucide Icons, Canvas-Confetti
* **Akıllı Sözleşme (Smart Contract):** Solidity ^0.8.20 (ERC-721 Soulbound Token standardı)
* **Web3 Kütüphaneleri:** Ethers.js v6, Solc ^0.8.20
* **Durum Yönetimi & Kalıcılık:** LocalStorage API (çevrimdışı çalışabilir, demo sırasında sunucu kesintisi yaşamaz)
* **Backend API:** Next.js Route Handlers (`/api/chat` - Hibrit AI motoru)

### Klasör Yapısı
```
pru-ai-academy/
├── contracts/
│   ├── PRUCertificate.sol        # Soulbound Token (SBT) akıllı sözleşmesi (onlyOwner yetkili)
│   ├── PRUCertificate.json       # Derlenmiş ABI ve Bytecode artifact'ı
│   └── scripts/
│       ├── compile.js            # solc tabanlı sözleşme derleyicisi
│       └── deploy.js             # Ethers.js v6 canlı Arbitrum Sepolia dağıtım betiği
├── scripts/
│   └── test-validation.js        # CI mimari ve güvenlik doğrulama testi
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
│   │   ├── AIMentorChat.tsx      # Entegre AI Chatbot, sohbet geçmişi ve not sentezleyici
│   │   ├── LeaderboardView.tsx   # Şampiyonlar podyumu ve üye tablosu
│   │   ├── AdminRadarView.tsx    # Tıkanan öğrenci radarı ve yönetim masası
│   │   ├── CertificateModal.tsx  # Soulbound diploma, cüzdan mint ve demo önizleme
│   │   └── HackathonGuideView.tsx# Hackathon kuralları, geri bildirimler & yol haritası
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
git clone https://github.com/Ulku2706/pru-academy.git
cd pru-academy
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

*(İsteğe bağlı)* Ortam değişkenleri için `.env.example` dosyasını `.env.local` olarak kopyalayabilirsiniz; ancak harici hiçbir anahtar olmadan da sistem yerleşik hibrit motoruyla eksiksiz ve demoya hazır şekilde çalışır.

---

## 7. Onchain kısım

### Akıllı Sözleşme Mimarisi
* **Sözleşme Adı:** `PRUCertificate.sol`
* **Standart:** Soulbound Token (SBT) - Devredilemez ERC-721
* **Ağ:** Arbitrum Sepolia Testnet (Chain ID: `421614`)
* **RPC URL:** `https://sepolia-rollup.arbitrum.io/rpc`

### Güvenlik Mimarisi (`onlyOwner`)
Sözleşme, sertifika basma yetkisini (`issueCertificate`) yalnızca kontrat sahibine (kulüp yönetici cüzdanına) verir. Böylece kulüp harici kişilerin kendi kendilerine mezuniyet sertifikası basması matematiksel olarak engellenmiştir. Transfer fonksiyonları (`transferFrom`, `safeTransferFrom`) devredilemezlik kuralı gereği revert eder.

### Testnete Dağıtım Adımları (Deployment)
Proje içerisinde yer alan derleme ve dağıtım betikleriyle Arbitrum Sepolia'ya dağıtım yapılabilir:

```bash
# 1. Sözleşmeyi derleyin:
node contracts/scripts/compile.js

# 2. Arbitrum Sepolia musluğundan (faucet) test ETH aldıktan sonra dağıtımı gerçekleştirin:
$env:PRIVATE_KEY="cuzdan_ozel_anahtariniz"; node contracts/scripts/deploy.js
```

Dağıtım betiği tamamlandığında üretilen sözleşme adresi `.env.local` dosyasına otomatik kaydedilir. Arayüz bu adresi algıladığında doğrudan canlı cüzdan mint akışını devreye alır; sözleşme henüz dağıtılmadığında ise dürüst bir şekilde kullanıcıya **"Demo Önizleme Modu"** sunar.

---

## 8. Kulüp bunu nasıl devralır?
* **Yayına Alma:** Proje Next.js tabanlı olduğu için kulübün GitHub hesabına bağlandığında **Vercel** veya **Netlify** üzerinde **0 TL maliyetle** tek tıkla ücretsiz yayına alınabilir.
* **Akıllı Sözleşme:** Arbitrum Sepolia üzerinde test ETH ile 0 maliyetle çalışır. Kulüp ileride ana ağa (Arbitrum One veya Base) geçmek isterse işlem başına ~0.01$ gibi ihmal edilebilir bir gas maliyeti oluşur.
* **Ortak Veritabanına Geçiş:** Proje modüler TypeScript yapısında olduğu için `src/data/mockStudents.ts` veri okuma katmanı tek bir SQL/Supabase istemcisiyle değiştirilerek 1 gün içinde canlı veri tabanına bağlanabilir.
* **Müfredat Güncelleme:** `src/data/curriculum.ts` dosyasındaki JSON yapısına yeni haftalar veya konular eklemek için tek bir dosyanın güncellenmesi yeterlidir; kodlama bilgisi gerektirmez.

---

## 9. Hazır kullanılanlar ve yapay zeka kullanımı
* **Açık Kaynak Kütüphaneler:** Next.js 14, Tailwind CSS, Lucide React (ikon seti), Canvas-Confetti (kutlama animasyonları), Ethers.js v6, Solc.
* **Yapay Zeka Kullanımı:** 
  - Hackathon kuralları doğrultusunda, projenin fikir mimarisinin oluşturulması, modüler React bileşenlerinin yazılması, TypeScript tiplerinin denetlenmesi ve Solidity Soulbound akıllı sözleşmesinin geliştirilmesinde Google Antigravity / Gemini yapay zeka araçlarından pair-programming desteği alınmıştır.
  - Uygulama içindeki pedagojik AI Mentor yanıt ve özet motoru, kulüp üyelerine özel prompting ve hibrit dil modeli mimarisiyle entegre edilmiştir.

---

## 10. Takım
* **Ülkü Dilmen** (GitHub: [@Ulku2706](https://github.com/Ulku2706))
  - **Rol:** Takım Lideri, Full-Stack & Web3 Geliştirici
  - **Katkılar:** Ürün mimarisi, Next.js arayüz tasarımı, PRU AI Mentor çok katmanlı sohbet motoru ve sohbet geçmişi entegrasyonu, Solidity Soulbound akıllı sözleşmesi ve testnet derleme/dağıtım betikleri.
* **PRU Blockchain Kulübü Çekirdek Takımı**
  - **Rol:** Fikir Doğrulama, Topluluk Deneyimi & Müfredat Tasarımı
  - **Katkılar:** Kulüp içi eğitim tıkanıklığı krizinin tespiti, 4 haftalık özgün Web3 müfredatı, liderlik tablosu puanlama dinamikleri ve hackathon sunumu.
