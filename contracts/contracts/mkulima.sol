// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

contract mkulima{
    struct product{
        uint id;
        string productName;
        address payable owner;
        uint price;
        string image;
        uint stock;
        string location;
    }

    struct buyLogs{
        address buyer;
        string property;
        uint price;
    }

    uint public numberofProducts;
    mapping(uint =>product) public products;
    mapping(address => buyLogs[]) public buyTransactions;
    function addProduct(string memory _productName, uint _price, string memory _image, string memory _location) public {
        numberofProducts++;
        products[numberofProducts]=product(numberofProducts, _productName, payable(msg.sender), _price, _image, 0, _location);
    }

    function buyProduct(uint _product_id) public payable{
        address payable owner = payable(products[_product_id].owner);
        require(products[_product_id].stock > 0, "out of stock");
        require(products[_product_id].price == msg.value, "you need to pay the exact price");
        owner.transfer(msg.value);
        products[numberofProducts].stock--;
        buyTransactions[products[numberofProducts].owner].push(buyLogs(msg.sender, products[_product_id].productName,msg.value));
    }

    function updateStock(uint _product_id) public {
        require(products[_product_id].owner == msg.sender, "only owner can perform");
        products[_product_id].stock++;
    }
}