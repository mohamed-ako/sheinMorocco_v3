import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "./store";
import InstallApp from "./InstallApp";
import HomeDesign from "./Create_design/Home";
import "./style.css";

const ProductList = ({ category }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products) || [];
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const loggedIn = useSelector((state) => state.admin.loggedIn);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(products)) {
      if (category && category.length > 0) {
        const filteredProducts = products.filter(
          (product) => product.category === category
        );
        setDisplayedProducts(filteredProducts);
      } else {
        setDisplayedProducts(products);
      }
    } else {
      console.error("Products state is not an array or is undefined");
    }
  }, [category, products]);

  if (!Array.isArray(displayedProducts) || displayedProducts.length === 0) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="ProdList">
      {category ? (
        <h1 className="searchedTitle">{category}</h1>
      ) : (
        <div className="upperHome">
          <HomeDesign />
          <main className="DownApp">
            <p>قم بتحميل تطبيقنا</p>
            <InstallApp />
          </main>
        </div>
      )}
      {displayedProducts.map((product) => (
        <div
          key={product._id || `product-${Math.random()}`} // Ensure unique key
          className={`prod ${product.quantity === 0 ? "out-of-stock" : ""}`}
        >
          {loggedIn && (
            <div className="admin-buttons">
              <button
                className="btn"
                onClick={() => dispatch(deleteProduct(product._id))}
              >
                DELETE
              </button>
              <button className="btn">
                <Link to={`/edit/${product._id}`}>EDIT</Link>
              </button>
            </div>
          )}
          <Link to={`/product/${product._id}`}>
            <div className="front-content">
              {product.theImage ? (
                <img src={product.theImage} alt="Product" />
              ) : (
                <div className="placeholder-image">No Image Available</div>
              )}
            </div>
          </Link>
          <div className="content">
            <h4 className="heading">{product.name || "Product Name"}</h4>
            <div className="price">
              <p>{product.price || "N/A"}</p>
              <p className="dh">DH</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
