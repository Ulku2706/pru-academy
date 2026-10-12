export const CONTRACT_CONFIG = {
  networkName: "Arbitrum Sepolia Testnet",
  chainId: 421614,
  contractAddress: "0x3B89a4Fc5C4e8C5996b27E21b44B2720d29188F3",
  symbol: "PRU-SBT",
  tokenName: "PRU Blockchain Academy Soulbound Certificate",
  explorerBaseUrl: "https://sepolia.arbiscan.io",
  backupExplorerUrl: "https://sepolia.etherscan.io",
};

export const CONTRACT_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function ownerOf(uint256) view returns (address)",
  "function hasCertificate(address) view returns (bool)",
  "function issueCertificate(address student, string studentName, string studentNo, uint256 totalXP, string metadataURI) returns (uint256)",
  "event CertificateIssued(address indexed student, uint256 indexed tokenId, string studentName, string studentNo, uint256 issueDate)",
];

export async function requestWalletConnection(): Promise<{ address: string; connected: boolean }> {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts && accounts.length > 0) {
        return { address: accounts[0], connected: true };
      }
    } catch (error) {
      console.warn("Wallet connection rejected or cancelled, using demo address", error);
    }
  }
  // Deterministic demo wallet fallback
  return {
    address: "0x71C2B14e59D6cD47A531A21E8Ac8B40194e4849F",
    connected: true,
  };
}

export function generateExplorerTxUrl(txHash: string): string {
  return `${CONTRACT_CONFIG.explorerBaseUrl}/tx/${txHash}`;
}

export function generateExplorerAddressUrl(address: string): string {
  return `${CONTRACT_CONFIG.explorerBaseUrl}/address/${address}`;
}

export function generateDemoTxHash(): string {
  const chars = "0123456789abcdef";
  let hash = "0x";
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}
