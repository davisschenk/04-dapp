import preval from "preval.macro";

const productReviewABIPath = "../build/contracts/ProductReview.json";
const productReviewAddress = "0x650902d3431225dCFe01b0E0221031A52C94da8c";

const productReviewABI = preval`
  const fs = require('fs');
  const path = require('path');
  const productReviewABIPath = path.resolve(__dirname, "${productReviewABIPath}");
  const productReviewABI = fs.readFileSync(productReviewABIPath, 'utf8');
  module.exports = JSON.parse(productReviewABI);
`;

const productABIPath = "../build/contracts/ProductContract.json";
const productAddress = "0xC813c97E9DE227A9641e2cB4AdF91a5b69DA570f";

const productABI = preval`
  const fs = require('fs');
  const path = require('path');
  const productABIPath = path.resolve(__dirname, "${productABIPath}");
  const productABI = fs.readFileSync(productABIPath, 'utf8');
  module.exports = JSON.parse(productABI);
`;

export const loadProductReviewContract = async (web3) => {
  const contract = new web3.eth.Contract(
    productReviewABI.abi,
    productReviewAddress,
  );

  return contract;
};

export const loadProductContract = async (web3) => {
  const contract = new web3.eth.Contract(
    productABI.abi,
    productAddress,
  );

  return contract;
};
