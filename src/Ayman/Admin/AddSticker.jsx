import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSticker } from '../store'; // Adjust import path if needed
import '../style.css'
const AddSticker = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stickerImage, setStickerImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setStickerImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !category || !stickerImage) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('stickerImage', stickerImage);

    dispatch(addSticker(formData))
      .unwrap()
      .then(() => {
        setName('');
        setCategory('');
        setStickerImage(null);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className='add'>
      <h2>Add New Sticker</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label>Sticker Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Add Sticker</button>
      </form>
    </div>
  );
};

export default AddSticker;
