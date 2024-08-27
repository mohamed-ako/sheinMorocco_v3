import React, { useState } from "react";
import { useSelector  } from "react-redux";
import Login from "../Login";
import AddClothe from "./AddClothe";
import AddSticker from "./AddSticker";
import "../style.css";
import { selectCurrentUser } from "../store"; // Import the selector
import AddProductFun from "./AddProduct";
const AdminPage = () => {

  const currentUser = useSelector(selectCurrentUser); // Use selector to get the current user
  const [addProduct, setAddProduct] = useState(false); // For HTML input
  const [addSticker, setAddSticker] = useState(false); // For HTML input
  const [addclothe, setAddclothe] = useState(false); // For HTML input

  console.log("user :", currentUser);

  return (
    <div className="AdminPage">
      {currentUser ? (
        <div className="adminButtons">
          <button
            onClick={() => {
              setAddProduct(true);
              setAddSticker(false);
              setAddclothe(false);
            }}
          >
            Add Product
          </button>
          <button
            onClick={() => {
              setAddProduct(false);
              setAddSticker(true);
              setAddclothe(false);
            }}
          >
            Add Sticker
          </button>
          <button
            onClick={() => {
              setAddProduct(false);
              setAddSticker(false);
              setAddclothe(true);
            }}
          >
            Add Clothes
          </button>
          {addProduct && <AddProductFun />}
          {addSticker && <AddSticker />}
          {addclothe && <AddClothe />}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default AdminPage;
