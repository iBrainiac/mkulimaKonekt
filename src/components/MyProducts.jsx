import { useState, useEffect } from "react";
import { web3 } from "../utils/web3utils";

const MyProducts = ({ products, onIncrement }) => {
  const [accountAddress, setAccountAddress] = useState(null);
  let a =
    products &&
    products.filter(
      (product) => product.owner.toLowerCase() == accountAddress.toLowerCase()
    );
  console.log(accountAddress);
  console.log(a);

  async function login() {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    setAccountAddress(account);
  }

  useEffect(() => {
    login();
  }, []);

  return (
    <div className="w3-auto">
      <table className="w3-table w3-bordered">
        <caption>My Products</caption>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
        {a &&
          a.map(({ id, location, owner, price, productName, image, stock }) => {
            return (
              <tr>
                <td>{productName}</td>
                <td>{web3.utils.fromWei(price, "ether")} ETH</td>
                <td>{stock}</td>
                <td>
                  <button
                    className="w3-btn w3-border w3-small"
                    value={id}
                    onClick={onIncrement}
                  >
                    increment
                  </button>
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default MyProducts;
