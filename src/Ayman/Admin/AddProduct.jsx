import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../store";
import "../style.css";
import { selectCurrentUser } from "../store"; // Import the selector

export default function AddProductFun() {
  const dispatch = useDispatch();
  const [htmlInput, setHtmlInput] = useState(""); // For HTML input
  const [htmlInputShein, setHtmlInputShein] = useState(""); // For HTML input
  const currentUser = useSelector(selectCurrentUser); // Use selector to get the current user

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    theImage: "",
    images: [],
    video: "",
    publisher: "",
    price: "",
    theOldPrice: "",
    quantity: "",
    favorite: "",
  });

  const categories = ["Clothes", "Stickers", "Other"]; // Existing categories

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      publisher: currentUser?.username || "Unknown", // Use currentUser for the publisher
    };
    dispatch(addProduct(updatedFormData));
    alert("Product added successfully!");
    setFormData({
      name: "",
      description: "",
      category: "",
      theImage: "",
      images: [],
      video: "",
      publisher: "",
      price: "",
      theOldPrice: "",
      quantity: "",
      favorite: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddImageInput = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, ""],
    }));
  };

  const handleRemoveImageInput = (index) => {
    setFormData((prevFormData) => {
      const updatedImages = [...prevFormData.images];
      updatedImages.splice(index, 1);
      return {
        ...prevFormData,
        images: updatedImages,
      };
    });
  };

  const handleImageUrlChange = (e, index) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedImages = [...prevFormData.images];
      updatedImages[index] = value;
      return {
        ...prevFormData,
        images: updatedImages,
      };
    });
  };

  const extractDataFromHtml = () => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlInput, "text/html");

      const nameElement = doc.querySelector("h1");
      const name = nameElement ? nameElement.textContent.trim() : "";
      const videoElement = doc.querySelector("source");
      const video = videoElement ? videoElement.textContent.trim() : "";

      const priceElement = doc.querySelector(".product-price-value");
      let price = priceElement ? priceElement.textContent.trim() : "";
      price = price.replace(/[^0-9.]/g, "");
      const priceNumber = parseFloat(price);

      const imageElements = doc.querySelectorAll(
        ".image-view--wrap--UhXabwz img"
      );
      const images = Array.from(imageElements).map((img) =>
        img.src.replace(/_\d+x\d+\.(png|jpg)/g, "")
      );

      const descElement = doc.querySelector("#product-description");
      let desc = descElement ? descElement.textContent.trim() : "";

      setFormData((prevFormData) => ({
        ...prevFormData,
        name,
        price: priceNumber,
        images: images.slice(1),
        theImage: images[0] || "",
        video,
        description: desc,
      }));

      alert("Form data updated");
    } catch (error) {
      console.error("Error parsing HTML:", error);
      alert(
        "There was an error extracting data from the HTML. Please check the input."
      );
    }
  };

  const extractDataFromHtmlShein = () => {
    try {
      const parser = new DOMParser();
      const docSh = parser.parseFromString(htmlInputShein, "text/html");

      const nameElementSh = docSh.querySelector("h1");
      const nameSh = nameElementSh ? nameElementSh.textContent.trim() : "";

      const videoElementSh = docSh.querySelector("source");
      const videoSh = videoElementSh ? videoElementSh.getAttribute("src") : "";

      const priceElementSh = docSh.querySelector(".original");
      let priceSh = priceElementSh ? priceElementSh.textContent.trim() : "";
      priceSh = priceSh.replace(/[^0-9.]/g, "");
      const priceNumberSh = parseFloat(priceSh);

      const imageElementsSh = docSh.querySelectorAll(
        ".crop-image-container img"
      );
      const imagesSh = Array.from(imageElementsSh).map((img) =>
        img.getAttribute("src").replace(/_\d+x\d+/, "")
      );

      const descElementSh = docSh.querySelector(".product-intro__attr-wrap");
      const descSh = descElementSh ? descElementSh.textContent.trim() : "";

      setFormData((prevFormData) => ({
        ...prevFormData,
        name: nameSh,
        price: priceNumberSh,
        images: imagesSh.slice(1),
        theImage: imagesSh[0] || "",
        video: videoSh,
        description: descSh,
      }));

      alert("Form data updated");
    } catch (error) {
      console.error("Error parsing HTML:", error);
      alert(
        "There was an error extracting data from the HTML. Please check the input."
      );
    }
  };

  return (
    <div className="add">
      <main>
        <textarea
          rows="10"
          cols="50"
          placeholder="Paste AliExpress HTML here"
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value)}
        />
        <button onClick={extractDataFromHtml}>Extract Data</button>
      </main>
      <main>
        <textarea
          rows="10"
          cols="50"
          placeholder="Paste Shein HTML here"
          value={htmlInputShein}
          onChange={(e) => setHtmlInputShein(e.target.value)}
        />
        <button onClick={extractDataFromHtmlShein}>Extract Data</button>
      </main>
      <form onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          <option value="">Add New Category</option>
        </select>
        <input
          type="text"
          name="newCategory"
          placeholder="New Category"
          onChange={(e) => {
            if (e.target.value) {
              setFormData((prevFormData) => ({
                ...prevFormData,
                category: e.target.value,
              }));
            }
          }}
        />
        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <label>Old Price:</label>
        <input
          type="text"
          name="theOldPrice"
          value={formData.theOldPrice}
          onChange={handleChange}
        />
        <label>Quantity:</label>
        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
        <label>First Image URL:</label>
        <input
          type="text"
          name="theImage"
          value={formData.theImage}
          onChange={handleChange}
        />
        <main>
          <label>Additional Images URL:</label>
          {formData.images.map((image, index) => (
            <div key={index}>
              <input
                type="text"
                name={`image_${index}`}
                value={image}
                onChange={(e) => handleImageUrlChange(e, index)}
              />
              <button
                type="button"
                onClick={() => handleRemoveImageInput(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddImageInput}>
            Add Image
          </button>
        </main>
        <label>Video URL:</label>
        <input
          type="text"
          name="video"
          value={formData.video}
          onChange={handleChange}
        />
        <label>Favorite:</label>
        <select
          name="favorite"
          value={formData.favorite}
          onChange={handleChange}
        >
          <option value="">Select Favorite Status</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
