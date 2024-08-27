import { Link } from "react-router-dom";
import "./style.css";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchProducts, clearFilters } from "./store";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchTerm) {
      dispatch(searchProducts(searchTerm));
    } else {
      dispatch(clearFilters());
    }
  };
  console.log(searchTerm);

  return (
    <div className="searchPage">
      <div className="searchContainer">
        <input
          type="text"
          className="searchInput"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <button className="searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="categories">
        <Link className="categoryLink home" to={`/`}>
          Home
        </Link>
        <Link className="categoryLink clothes" to={`/list/${"clothes"}`}>
          Clothes
        </Link>
        <Link className="categoryLink accessory" to={`/list/${"accessory"}`}>
          Accessory
        </Link>
        <Link className="categoryLink makeup" to={`/list/${"makeup"}`}>
          Makeup
        </Link>
        {/* <img width={'70px'} src='https://i.pinimg.com/736x/eb/23/c4/eb23c4646d1c29615347ce6c5ec9db53.jpg' alt="cc"/> */}
      </div>
    </div>
  );
}
