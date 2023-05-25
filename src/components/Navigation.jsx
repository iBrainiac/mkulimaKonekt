import { useState, useEffect } from "react";
import { isLoggedIn } from "../utils/web3utils";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [loggedin, setLoggedIn] = useState(null);
  async function login() {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];
    console.log(account);
  }
  useEffect(() => {
    async function connected() {
      const loggedin = await isLoggedIn();
      setLoggedIn(loggedin);
    }
    connected();
  }, []);
  return (
    <div className="w3-text-blue w3-bar w3-padding">
      <span className="w3-large w3-bar-item" style={{ fontWeight: "bold" }}>
        Mkulima Konnect
      </span>
      <Link to="/" className="w3-bar-item">
        Home
      </Link>
      <Link to="/addproduct" className="w3-bar-item">
        Add Product
      </Link>
      <Link to="/products" className="w3-bar-item">
        Products
      </Link>
      <div className="w3-right">
        {loggedin ? (
          <Link to="/myprofile" className="w3-bar-item">
            My Profile
          </Link>
        ) : (
          <button className="w3-bar-item" onClick={login}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
