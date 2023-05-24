import React, { useState } from 'react';
import { contract, web3 } from '../utils/web3utils';

function PropertyForm() {
  const [propertyName, setPropertyName] = useState('');
  const [propertyPrice, setPropertyPrice] = useState(0);
  const [propertyLocation, setPropertyLocation] = useState('');
  const [propertyImage, setPropertyImage] = useState(null);

  const handleSubmit = (event) => { 

    event.preventDefault();
    const accounts =  ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    contract.methods.addProduct(propertyName, propertyPrice, "image1", propertyLocation).send({from: account, gasLimit: "1000000"}).then((data) => console.log(data))
    // handle form submission
  };

  const handleNameChange = (event) => {
    setPropertyName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPropertyPrice(event.target.value);
  };

  const handleLocationChange = (event) => {
    setPropertyLocation(event.target.value);
  };

  const handleImageChange = (event) => {
    setPropertyImage(event.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="property-name">Property Name:</label>
      <input
        type="text"
        id="property-name"
        name="property-name"
        value={propertyName}
        onChange={handleNameChange}
        required
      />

      <label htmlFor="property-price">Property Price:</label>
      <input
        type="number"
        id="property-price"
        name="property-price"
        value={propertyPrice}
        onChange={handlePriceChange}
        required      />

      <label htmlFor="property-location">Property Location:</label>
      <input
        type="text"
        id="property-location"
        name="property-location"
        value={propertyLocation}
        onChange={handleLocationChange}
        required
      />

      <label htmlFor="property-image">Property Image:</label>
      <input
        type="file"
        id="property-image"
        name="property-image"
        accept="image/*"
        onChange={handleImageChange}
        required
      />

      <button type="submit">Submit Property</button>
    </form>
  );
}
export default PropertyForm;