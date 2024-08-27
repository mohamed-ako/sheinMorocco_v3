import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addClothe } from "../store"; // Adjust import path if needed
import "../style.css";

const AddClothe = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [clotheImage, setClotheImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setClotheImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !color || !category || !price || !clotheImage) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("color", color);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("oldPrice", oldPrice);
    formData.append("clotheImage", clotheImage);

    dispatch(addClothe(formData))
      .unwrap()
      .then(() => {
        setName("");
        setColor("");
        setCategory("");
        setPrice("");
        setOldPrice("");
        setClotheImage(null);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="add">
      <h2>Add New Clothe</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Color:</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Old Price:</label>
          <input
            type="text"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Clothe Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">Add Clothe</button>
      </form>
    </div>
  );
};

export default AddClothe;
