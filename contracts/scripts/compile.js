const fs = require("fs");
const path = require("path");
const solc = require("solc");

const contractPath = path.join(__dirname, "..", "PRUCertificate.sol");
const source = fs.readFileSync(contractPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "PRUCertificate.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"],
      },
    },
  },
};

console.log("🔨 PRUCertificate.sol derleniyor...");
const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
  output.errors.forEach((err) => {
    console.error(err.formattedMessage);
  });
  const hasErrors = output.errors.some((err) => err.severity === "error");
  if (hasErrors) {
    process.exit(1);
  }
}

const contract = output.contracts["PRUCertificate.sol"]["PRUCertificate"];
const artifact = {
  contractName: "PRUCertificate",
  abi: contract.abi,
  bytecode: contract.evm.bytecode.object,
};

const artifactPath = path.join(__dirname, "..", "PRUCertificate.json");
fs.writeFileSync(artifactPath, JSON.stringify(artifact, null, 2));

console.log(`✅ Derleme başarılı! Bytecode ve ABI kaydedildi: ${artifactPath}`);
