import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import Home from "./pages/Home";

import "./App.css";
import Products from "./pages/Products";
import MyProfile from "./pages/MyProfile";
import AddProduct from "./pages/AddProduct";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="products" element={<Products />} />
          <Route path="addproduct" element={<AddProduct />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
