/**
 * PRUCertificate Canlı Testnet Dağıtım Betiği (Ethers.js v6)
 * Arbitrum Sepolia Testnet veya herhangi bir EVM ağına gerçek deploy yapar.
 */

const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("⚓ PRUCertificate Dağıtım Süreci Başlatılıyor...\n");

  const artifactPath = path.join(__dirname, "..", "PRUCertificate.json");
  if (!fs.existsSync(artifactPath)) {
    console.error("❌ Derlenmiş sözleşme bulunamadı. Lütfen önce `node contracts/scripts/compile.js` çalıştırın.");
    process.exit(1);
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const rpcUrl = process.env.RPC_URL || "https://sepolia-rollup.arbitrum.io/rpc";
  const privateKey = process.env.PRIVATE_KEY;

  if (!privateKey) {
    console.log("ℹ️ BİLGİ: PRIVATE_KEY ortam değişkeni tanımlanmadı.");
    console.log("Gerçek testnet dağıtımı yapmak için:");
    console.log("  1. Arbitrum Sepolia musluğundan (faucet) test ETH edinin.");
    console.log("  2. Komutu cüzdanınızla çalıştırın:");
    console.log('     $env:PRIVATE_KEY="0x...cuzdan_ozel_anahtarınız"; node contracts/scripts/deploy.js\n');
    console.log("Hedef Ağ: Arbitrum Sepolia (Chain ID: 421614)");
    console.log("RPC: https://sepolia-rollup.arbitrum.io/rpc\n");
    return;
  }

  console.log(`Bağlanılan RPC: ${rpcUrl}`);
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  const balance = await provider.getBalance(wallet.address);
  console.log(`Deployer Adresi: ${wallet.address}`);
  console.log(`Bakiye: ${ethers.formatEther(balance)} ETH\n`);

  if (balance === 0n) {
    console.error("❌ Hata: Cüzdanda test ETH bulunmuyor. Arbitrum Sepolia musluğundan bakiye almalısınız.");
    process.exit(1);
  }

  console.log("🚀 Sözleşme zincire yükleniyor (Transaction gönderiliyor)...");
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  const contract = await factory.deploy();

  console.log(`İşlem Hash'i: ${contract.deploymentTransaction().hash}`);
  console.log("Blok onayı bekleniyor...");

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("\n🎉 TEBRİKLER! Sözleşme Arbitrum Sepolia testnetine başarıyla yüklendi:");
  console.log(`📍 Sözleşme Adresi: ${contractAddress}`);
  console.log(`🔗 Arbiscan Explorer: https://sepolia.arbiscan.io/address/${contractAddress}`);

  // Update .env.local
  const envPath = path.join(__dirname, "..", "..", ".env.local");
  let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  if (envContent.includes("NEXT_PUBLIC_CONTRACT_ADDRESS=")) {
    envContent = envContent.replace(/NEXT_PUBLIC_CONTRACT_ADDRESS=.*/, `NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
  } else {
    envContent += `\nNEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}\n`;
  }
  fs.writeFileSync(envPath, envContent);
  console.log("📝 .env.local dosyası yeni sözleşme adresiyle güncellendi.");
}

main().catch((err) => {
  console.error("❌ Dağıtım Hatası:", err);
  process.exit(1);
});
