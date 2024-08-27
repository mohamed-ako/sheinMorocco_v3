import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  fetchProducts,
  selectCart,
  selectAllProducts,
} from "./store";
import { Link } from "react-router-dom";
import "./style.css";

const MyList = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const products = useSelector((state) => state.products.products);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Calculate total price whenever cart or products change
  useEffect(() => {
    let total = 0;
    if (cart && cart.length > 0 && products && products.length > 0) {
      cart.forEach((productId) => {
        const product = products.find((p) => p._id === productId);
        if (product) {
          total += product.price;
        }
      });
      setTotalPrice(total);
    }
  }, [cart, products]);

  const handleDelete = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const buyNow = () => {
    const whatsappURL = `https://api.whatsapp.com/send?phone=+212709817988&text=Buy%20List:%0D%0A${encodeURIComponent(
      JSON.stringify({
        products: products
          .filter((product) => cart.includes(product._id))
          .map((product) => ({
            id: product._id,
            name: product.name,
            quantity: cart.filter((id) => id === product._id).length,
          })),
        totalPrice: totalPrice,
      })
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="mylist">
      {cart && cart.length > 0 && products && products.length > 0 ? (
        <ul className="product-list">
          {products
            .filter((product) => cart.includes(product._id))
            .map((product) => (
              <li key={product._id} className="product-item">
                <div className="prod">
                  <Link className="link" to={`/product/${product._id}`}>
                    <div>
                      {product.theImage && (
                        <img src={product.theImage} alt="Product" />
                      )}
                    </div>
                  </Link>
                  <div className="content">
                    <p className="title">{product.name}</p>
                    <p className="price">{product.price} DH</p>
                    <p>
                      Quantity: {cart.filter((id) => id === product._id).length}
                    </p>
                    <button
                      className="btn"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          <div className="last">
            <p>Total to Pay: {totalPrice} DH</p>
            <button className="btn buy" onClick={buyNow}>
              Buy now
            </button>
          </div>
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default MyList;
