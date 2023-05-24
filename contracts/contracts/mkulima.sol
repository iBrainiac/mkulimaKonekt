contract mkulima{
    struct product{
        string productName;
        address owner;
        uint price;
        string image;
        uint stock;
        string location;
    }
uint public numberofProducts;
mapping(uint =>product) public products;
function addProduct(string memory _productName, uint _price, string memory _image, string memory _location) public {
    numberofProducts++;
    products[numberofProducts]=product(_productName, msg.sender, _price, _image, 0, _location);
}
}