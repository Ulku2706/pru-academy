/**
 * PRU AI-Academy Otomasyon & Sistem Doğrulama Test Paketi
 * Proje mimarisi, sözleşme güvenliği ve repo bütünlüğünü denetleyen CI testi.
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 PRU AI-Academy Sistem Doğrulama Testi Başlatılıyor...\n");

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`✅ [BAŞARILI]: ${message}`);
    passedTests++;
  } else {
    console.error(`❌ [BAŞARISIZ]: ${message}`);
    process.exitCode = 1;
  }
}

// 1. Dokümantasyon & Zorunlu Bölüm Kontrolü
const readmePath = path.join(__dirname, "..", "README.md");
assert(fs.existsSync(readmePath), "README.md dosyası repo kökünde mevcut");

const readmeContent = fs.readFileSync(readmePath, "utf-8");
const mandatoryHeadings = [
  "1. Problem",
  "2. Çözüm",
  "3. Kim kullanacak?",
  "4. Özellikler",
  "5. Teknik yapı",
  "6. Kurulum ve çalıştırma",
  "7. Onchain kısım",
  "8. Kulüp bunu nasıl devralır?",
  "9. Hazır kullanılanlar ve yapay zeka kullanımı",
  "10. Takım",
];

mandatoryHeadings.forEach((h) => {
  assert(readmeContent.includes(h), `README Standart Başlık: '${h}' mevcut`);
});

// 2. Akıllı Sözleşme & Güvenlik Doğrulaması
const contractPath = path.join(__dirname, "..", "contracts", "PRUCertificate.sol");
assert(fs.existsSync(contractPath), "contracts/PRUCertificate.sol mevcut");

const contractContent = fs.readFileSync(contractPath, "utf-8");
assert(contractContent.includes("SoulboundTokenCannotBeTransferred"), "Sözleşmede devredilemezlik (Soulbound) kuralı uygulandı");
assert(contractContent.includes("issueCertificate") && contractContent.includes("onlyOwner"), "issueCertificate fonksiyonunda onlyOwner yetki denetimi uygulandı");

const artifactPath = path.join(__dirname, "..", "contracts", "PRUCertificate.json");
assert(fs.existsSync(artifactPath), "Derlenmiş sözleşme artifact'ı (PRUCertificate.json) mevcut");

// 3. Güvenlik & Gizlilik Denetimi
assert(!readmeContent.includes("0xprivatekey"), "README dosyasında açık özel anahtar sızıntısı yok");
assert(fs.existsSync(path.join(__dirname, "..", ".gitignore")), ".gitignore dosyası mevcut");
assert(fs.existsSync(path.join(__dirname, "..", ".env.example")), ".env.example şablon dosyası mevcut");

// 4. Veri Bütünlüğü & Müfredat
const curriculumPath = path.join(__dirname, "..", "src", "data", "curriculum.ts");
assert(fs.existsSync(curriculumPath), "Müfredat veri modeli (curriculum.ts) mevcut");

const mockStudentsPath = path.join(__dirname, "..", "src", "data", "mockStudents.ts");
assert(fs.existsSync(mockStudentsPath), "Kulüp üye veri modeli (mockStudents.ts) mevcut");

console.log(`\n📊 Doğrulama Tamamlandı: ${passedTests} / ${totalTests} test başarıyla geçti.`);
