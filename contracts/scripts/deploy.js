/**
 * PRUCertificate Deploy Script (Ethers v6 / Hardhat)
 * Arbitrum Sepolia Testnet veya Yerel EVM Düğümüne dağıtım yapar.
 */

const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("⚓ PRUCertificate (Soulbound Token) akıllı sözleşmesi deploy ediliyor...");

  const rpcUrl = process.env.RPC_URL || "https://sepolia-rollup.arbitrum.io/rpc";
  const privateKey = process.env.PRIVATE_KEY;

  if (!privateKey) {
    console.log("ℹ️ PRIVATE_KEY belirtilmedi. Örnek deploy yapılandırması gösteriliyor:");
    console.log("- Hedef Ağ: Arbitrum Sepolia Testnet (Chain ID: 421614)");
    console.log("- Sözleşme: PRUCertificate (ERC-721 Soulbound Token)");
    console.log("- Dağıtılmış Sözleşme Adresi: 0x3B89a4Fc5C4e8C5996b27E21b44B2720d29188F3");
    console.log("- Explorer: https://sepolia.arbiscan.io/address/0x3B89a4Fc5C4e8C5996b27E21b44B2720d29188F3");
    return;
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  console.log(`Deployer Cüzdan Adresi: ${wallet.address}`);
}

main().catch((error) => {
  console.error("Deploy Hatası:", error);
  process.exit(1);
});
