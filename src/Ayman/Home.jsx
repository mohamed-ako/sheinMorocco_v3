import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Contact from "./Contact";
import "./style.css";
import MyList from "./MyList";
import AddProductForm from "./Admin/AdminPage";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import EditProductForm from "./EditProductForm";
import { useSelector } from "react-redux";
import Navbar from "./NavBar";
import Search from "./Search";
import Create from "./Create_design/Create";
import HomeDesign from "./Create_design/Home";

function Home() {
  const { category } = useParams();
  // if (category !== 'none' ){
  //   category
  // }
  return (
    <div className="HomePage">
      <div className="searchHome">
        <Search />
      </div>
      <ProductList category={category} />
    </div>
  );
}
export default function Index() {
  // Use useSelector hook to access cart state from Redux store
  const cart = useSelector((state) => state.cart.cart) || []; // Access the cart array
  const cartLength = cart.length; // Get the length of the cart array

  return (
    <Router>
      <div>
        <Navbar cartLength={cartLength} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="/list/:category" element={<Home />} />
          <Route path="/newDesign/:id" element={<Create />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/AddProductForm" element={<AddProductForm />} />
          <Route path="/product/:id" element={<ProductDetails />} />{" "}
          <Route path="/MyList" element={<MyList />} />
          <Route path="/edit/:id" element={<EditProductForm />} />
          <Route path="/create_design" element={<HomeDesign />} />{" "}
          {/* Add route for design creation */}
        </Routes>
      </div>
    </Router>
  );
}
