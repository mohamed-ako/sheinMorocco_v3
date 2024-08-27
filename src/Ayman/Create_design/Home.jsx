import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchClothes } from "../store";
import "../style.css";

export default function HomeDesign() {
  const dispatch = useDispatch();
  const allClothes = useSelector((state) => state.clothes);
  const clothes = allClothes.clothes || [];

  useEffect(() => {
    dispatch(fetchClothes());
  }, [dispatch]);
  return (
    <div className="homeDesign">
      <Link className="design" to="./create_design">
        <h3 className="designTitle">قم بإنشاء تصميمك الخاص</h3>
        <img
          className="CreatLink"
          src="https://i.pinimg.com/736x/ee/50/74/ee507454a369671b1a8ca5774accf8c8.jpg"
          alt="link"
        />
      </Link>
      <main className="clothesList">
        {clothes.map((cloth) => (
          <div className="cloth">
            <Link
              to={`./newDesign/${cloth._id}`}
              key={cloth._id}
              className="prod"
            >
              <img
                src={`http://localhost:5000${cloth.imageUrl}`}
                alt={cloth.name}
              />
              <span>
                <h2>{cloth.name}</h2>
                <p className="oldPrice">{cloth.oldPrice}</p>
                <p>{cloth.price}</p>
              </span>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}
