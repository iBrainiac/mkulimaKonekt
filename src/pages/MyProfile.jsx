import { useEffect, useState } from "react";
import MyProducts from "../components/MyProducts";
import Navigation from "../components/Navigation";
import { contract } from "../utils/web3utils";

const MyProfile = () => {
  const [contractData, setContractData] = useState(null);
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

  async function handleIncrement(e) {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    const increment = await contract.methods
      .updateStock(e.target.value)
      .send({ from: account, gasLimit: "1000000" })
      .then((data) => console.log(data));
    getproducts();
  }

  return (
    <>
      <Navigation />
      {console.log(contractData)}
      <MyProducts products={contractData} onIncrement={handleIncrement} />
    </>
  );
};

export default MyProfile;
