import { useState } from "react";
// import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../style.css";

export default function Create() {
  const { id } = useParams();

  const [clothesImg, setclothesImg] = useState("./Clothes/Hoodie/white");
  const [stickersImg, setstickersImg] = useState("./Stickers/2");

  //   const stickers = useSelector((state) => state.stickers.stickers);

  return (
    <div>
      <main className="clothesImg">
        <h1>{id}</h1>
        <img className="clothe" alt={clothesImg} src={`${clothesImg}.png`} />
        <img className="sticker" alt={stickersImg} src={`${stickersImg}.png`} />
      </main>
      <main className="clothesChoice">
        <div className="hoodies">
          <img
            alt="black_hoodie"
            src="./Clothes/Hoodie/black.png"
            onClick={() => setclothesImg("./Clothes/Hoodie/black")}
          />
          <img
            alt="white_hoodie"
            src="./Clothes/Hoodie/white.png"
            onClick={() => setclothesImg("./Clothes/Hoodie/white")}
          />
        </div>
        <div className="t-shorts">
          <img
            alt="black_t-short"
            src="./Clothes/T-Short/black.png"
            onClick={() => setclothesImg("./Clothes/T-Short/black")}
          />
          <img
            alt="white_t-short"
            src="./Clothes/T-Short/white.png"
            onClick={() => setclothesImg("./Clothes/T-Short/white")}
          />
        </div>
      </main>
      <main className="stickers">
        <img
          alt="sticker1"
          onClick={() => setstickersImg("./Stickers/1")}
          src="/Stickers/1.png"
        />
        <img
          alt="sticker2"
          onClick={() => setstickersImg("./Stickers/2")}
          src="/Stickers/2.png"
        />

        {/* {stickers.map((sticker) => (
          <img key={sticker.id} alt={sticker.name} src={sticker.img} />
        ))} */}
      </main>
    </div>
  );
}
