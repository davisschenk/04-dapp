const ProductReview = artifacts.require("ProductReview");
const ProductContract = artifacts.require("ProductContract");

module.exports = function (deployer) {
  deployer.deploy(ProductReview);
  deployer.deploy(ProductContract);
};
