import React from "react";
import { web3 } from "../utils/web3utils";

const ProductsCard = ({ products, onBuy }) => {
  const url = "http://localhost:3000";
  return (
    <div className="w3-auto w3-row-padding">
      <h3>Products</h3>
      {products &&
        products.map(
          ({ id, location, owner, price, productName, image, stock }) => {
            return (
              <div className="w3-col l4 m6">
                <div className="w3-card w3-round">
                  <div
                    style={{
                      backgroundImage: `url(${url + image})`,
                      height: "200px",
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <div className="w3-padding">
                    <h3>{web3.utils.fromWei(price, "ether")} Eth</h3>

                    <table className="w3-table">
                      <tr>
                        <th>Name</th>
                        <td>{productName}</td>
                      </tr>
                      <tr>
                        <th>Location</th>
                        <td>{location}</td>
                      </tr>
                      <tr>
                        <th>Items remaining</th>
                        <td>{stock}</td>
                      </tr>
                    </table>

                    <button
                      value={JSON.stringify({ id, price, owner })}
                      onClick={onBuy}
                      className="w3-button w3-border w3-border-blue"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        )}
    </div>
  );
};

export default ProductsCard;
