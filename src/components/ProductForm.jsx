import React, { useState } from "react";
import { contract, web3 } from "../utils/web3utils";

function ProductForm() {
  const [productName, setproductName] = useState("");
  const [productPrice, setproductPrice] = useState(0);
  const [productLocation, setproductLocation] = useState("");
  const [productImage, setproductImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    console.log(account);
    console.log(productImage);
    let formData = new FormData();
    formData.append("files", productImage);
    const options = {
      method: "POST",
      body: formData,
    };
    fetch("http://localhost:3000/upload", options)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        contract.methods
          .addProduct(
            productName,
            web3.utils.toWei(productPrice, "ether"),
            data,
            productLocation
          )
          .send({ from: account, gasLimit: "1000000" })
          .then((data) => {
            console.log(data);
            console.log("product added successfuly");
          })
          .catch((e) => {
            const message = e.message;
            alert("some error occured, please try again");
          });
      });
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
    <form className="w3-padding w3-card w3-auto" style={{ width: "40rem" }}>
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
        required
      />

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

      <button className="w3-button w3-blue" onClick={handleSubmit}>
        Submit product
      </button>
    </form>
  );
}
export default ProductForm;
