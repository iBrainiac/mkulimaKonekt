import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import ProductsCard from "../components/ProductsCard";
import { contract, web3 } from "../utils/web3utils";

const Products = () => {
  const [contractData, setContractData] = useState(null);
  const handleBuy = async (e) => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    const { price, id, owner } = JSON.parse(e.target.value);
    if (owner.toLowerCase() == account.toLowerCase()) {
      alert("you cant buy from your own product");
      return;
    }
    const formattedPrice = web3.utils.toWei(price, "ether");
    const buy = await contract.methods
      .buyProduct(id)
      .send({ from: account, value: price })
      .then((data) => {
        console.log(data);
        alert("product bought successfully");
        getproducts();
      })
      .catch((e) => {
        const message = e.message;
        if (message.includes("out of stock")) {
          alert("product out of stock");
        } else if (message.includes("you need to pay the exact price")) {
          alert("please pay the exact price");
        } else {
          alert("some error occured, please try again");
        }
      });
  };
  async function getproducts() {
    const count = await contract.methods.numberofProducts().call();
    const productPromises = [];

    for (let i = 1; i <= count; i++) {
      const promise = contract.methods.products(i).call();
      productPromises.push(promise);
    }

    const products = await Promise.all(productPromises);

    setContractData(products);
  }

  useEffect(() => {
    getproducts();
  }, []);

  return (
    <>
      {console.log(contractData)}
      <Navigation />
      <ProductsCard onBuy={handleBuy} products={contractData} />
    </>
  );
};

export default Products;
