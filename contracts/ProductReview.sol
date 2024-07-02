// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ProductReview {
    struct Review {
        address reviewer;
        string content;
    }

    constructor() {}

    mapping(uint256 => Review[]) public reviews;
    mapping(uint256 => uint256) public reviewsCount;

    function addReview(uint64 _product, string memory _content) public {
        reviews[_product].push(Review(msg.sender, _content));
        reviewsCount[_product]++;
    }

    function getReviews(uint256 _product) external view returns (Review[] memory) {
        return reviews[_product];
    }

    function getReviewsCount(uint256 _product) external view returns (uint256) {
        return reviewsCount[_product];
    }
}
