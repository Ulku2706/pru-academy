// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PRUCertificate
 * @dev Soulbound Token (SBT) / Non-transferable ERC-721 for PRU Blockchain Kulübü Akademi Mezunları.
 *      Bu sözleşme, Piri Reis Üniversitesi Blockchain Kulübü'nün 4 haftalık Web3 eğitim programını
 *      başarıyla tamamlayan öğrencilerine devredilemez dijital başarı sertifikası basar.
 *
 *      Neden Onchain?:
 *      Geleneksel PDF sertifikalar sahteciliğe açıktır ve CV'lerde bağımsız olarak doğrulanamaz.
 *      Soulbound Token (SBT) olarak blokzincire yazılan bu sertifika satılamaz, devredilemez
 *      ve ömür boyu doğrulanabilir bir akademik başarı kanıtıdır.
 */

interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

interface IERC721 is IERC165 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
}

interface IERC721Metadata is IERC721 {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function tokenURI(uint256 tokenId) external view returns (string memory);
}

contract PRUCertificate is IERC721Metadata {
    string private _name;
    string private _symbol;
    address public owner;

    uint256 private _nextTokenId;

    struct CertificateData {
        string studentName;
        string studentNo;
        uint256 issueDate;
        uint256 totalXP;
        string metadataURI;
    }

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => CertificateData) private _certificates;
    mapping(address => bool) public hasCertificate;

    event CertificateIssued(
        address indexed student,
        uint256 indexed tokenId,
        string studentName,
        string studentNo,
        uint256 issueDate
    );

    error SoulboundTokenCannotBeTransferred();
    error AlreadyHasCertificate();
    error NotContractOwner();
    error NonexistentToken();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotContractOwner();
        _;
    }

    constructor() {
        _name = "PRU Blockchain Academy SBT";
        _symbol = "PRU-SBT";
        owner = msg.sender;
        _nextTokenId = 1;
    }

    function name() external view override returns (string memory) {
        return _name;
    }

    function symbol() external view override returns (string memory) {
        return _symbol;
    }

    function totalSupply() external view returns (uint256) {
        return _nextTokenId - 1;
    }

    function balanceOf(address account) external view override returns (uint256) {
        require(account != address(0), "Address zero is not valid owner");
        return _balances[account];
    }

    function ownerOf(uint256 tokenId) public view override returns (address) {
        address tokenOwner = _owners[tokenId];
        if (tokenOwner == address(0)) revert NonexistentToken();
        return tokenOwner;
    }

    function getCertificate(uint256 tokenId) external view returns (CertificateData memory) {
        if (_owners[tokenId] == address(0)) revert NonexistentToken();
        return _certificates[tokenId];
    }

    /**
     * @notice Öğrenciye Soulbound Mezuniyet Rozeti basar.
     * @dev Yalnızca sözleşme sahibi (Kulüp Yöneticisi) yetkilidir.
     */
    function issueCertificate(
        address student,
        string calldata studentName,
        string calldata studentNo,
        uint256 totalXP,
        string calldata metadataURI
    ) external onlyOwner returns (uint256) {
        if (hasCertificate[student]) revert AlreadyHasCertificate();

        uint256 tokenId = _nextTokenId++;
        _owners[tokenId] = student;
        _balances[student] += 1;
        hasCertificate[student] = true;

        _certificates[tokenId] = CertificateData({
            studentName: studentName,
            studentNo: studentNo,
            issueDate: block.timestamp,
            totalXP: totalXP,
            metadataURI: metadataURI
        });

        emit Transfer(address(0), student, tokenId);
        emit CertificateIssued(student, tokenId, studentName, studentNo, block.timestamp);

        return tokenId;
    }

    function tokenURI(uint256 tokenId) external view override returns (string memory) {
        if (_owners[tokenId] == address(0)) revert NonexistentToken();
        return _certificates[tokenId].metadataURI;
    }

    /**
     * @dev Soulbound Kuralı: Token transfer edilemez! Yalnızca mint edilebilir (from == 0).
     */
    function transferFrom(address, address, uint256) external pure {
        revert SoulboundTokenCannotBeTransferred();
    }

    function safeTransferFrom(address, address, uint256) external pure {
        revert SoulboundTokenCannotBeTransferred();
    }

    function safeTransferFrom(address, address, uint256, bytes calldata) external pure {
        revert SoulboundTokenCannotBeTransferred();
    }

    function supportsInterface(bytes4 interfaceId) external pure override returns (bool) {
        return
            interfaceId == type(IERC165).interfaceId ||
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId;
    }
}
