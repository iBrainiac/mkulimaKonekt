import React, { useState } from 'react';
import { contract, web3 } from '../utils/web3utils';

function productForm() {
  const [productName, setproductName] = useState('');
  const [productPrice, setproductPrice] = useState(0);
  const [productLocation, setproductLocation] = useState('');
  const [productImage, setproductImage] = useState(null);

  const handleSubmit = async (event) => { 

    event.preventDefault();
    const accounts =  await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    console.log(account);// 
    await contract.methods.addProduct(productName, productPrice, "image1", productLocation).send({from: account, gasLimit: "1000000"}).then((data) => console.log(data))
  };

  const handleNameChange = (event) => {
    setproductName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setproductPrice(event.target.value);
  };

  const handleLocationChange = (event) => {
    setproductLocation(event.target.value);
  };

  const handleImageChange = (event) => {
    setproductImage(event.target.files[0]);
  };

  return (
    <form className="w3-padding w3-auto">
      <h3>Add Product</h3>
      <label htmlFor="product-name">product Name</label>
      <input
        type="text"
        id="product-name"
        name="product-name"
        className="w3-input w3-border w3-round"
        value={productName}
        onChange={handleNameChange}
        required
      />

      <label htmlFor="product-price">product Price</label>
      <input
        type="number"
        id="product-price"
        name="product-price"
        className="w3-input w3-border w3-round"
        value={productPrice}
        onChange={handlePriceChange}
        required      />

      <label htmlFor="product-location">product Location</label>
      <input
        type="text"
        id="product-location"
        name="product-location"
        className="w3-input w3-border w3-round"
        value={productLocation}
        onChange={handleLocationChange}
        required
      />

      <label htmlFor="product-image">product Image</label>
      <input
        type="file"
        id="product-image"
        name="product-image"
        className="w3-input w3-border w3-round"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <br />

      <button className="w3-button w3-blue" onClick={handleSubmit}>Submit product</button>
    </form>
  );
}
export default productForm;