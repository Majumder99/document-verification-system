const CertificateVerification = artifacts.require("CertificateVerification");

module.exports = (deployer) => {
  deployer.deploy(CertificateVerification);
};
