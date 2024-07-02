// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ProductContract {
  struct Product {
    address owner;
    string name;
  }

  Product[] products;

  constructor() {
  }

    function addProduct(string memory _name) public {
        products.push(Product(msg.sender, _name));
    }

    function getProduct(uint _index) public view returns (address, string memory) {
        require(_index < products.length, "Product index out of bounds.");
        Product storage product = products[_index];
        return (product.owner, product.name);
    }

    function getProducts() external view returns (Product[] memory) {
      return products;
    }

    function getProductsCount() public view returns (uint) {
        return products.length;
    }


}
