const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Clothes = require("./models/Clothes");
const Product = require("./models/Product");
const Stickers = require("./models/Stickers");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { fieldname } = file;
    if (fieldname === "stickerImage") {
      cb(null, "./Stickers");
    } else if (fieldname === "clotheImage") {
      cb(null, "./Clothes");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use("/Stickers", express.static("Stickers"));
app.use("/Clothes", express.static("Clothes"));

mongoose
  .connect(
    "mongodb+srv://mako:mako12@mako.kz32a3e.mongodb.net/?retryWrites=true&w=majority&appName=mako"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB: ", error));

const clothesRoutes = require("./routes/clothes");
const stickersRoutes = require("./routes/stickers");
// const usersRoutes = require("./routes/users");

app.use("/clothes", clothesRoutes);
app.use("/stickers", stickersRoutes);
// app.use("/users", usersRoutes);

// Register a new user
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
// Login a user
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new sticker
app.post("/sticker", async (req, res) => {
  try {
    const newSticker = new Stickers(req.body);
    await newSticker.save();
    res
      .status(201)
      .json({ message: "Sticker added successfully", data: newSticker });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all stickers
app.post("/sticker", upload.single("stickerImage"), async (req, res) => {
  try {
    const { file } = req;
    const newSticker = new Stickers({
      ...req.body,
      imageUrl: `/Stickers/${file.filename}`,
    });
    await newSticker.save();
    res
      .status(201)
      .json({ message: "Sticker added successfully", data: newSticker });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/sticker", async (req, res) => {
  try {
    const stickers = await Stickers.find().sort({ _id: -1 });
    res.json(stickers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/clothe", upload.single("clotheImage"), async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Uploaded file:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "File not uploaded" });
    }

    const newClothes = new Clothes({
      ...req.body,
      imageUrl: `/Clothes/${req.file.filename}`,
    });

    await newClothes.save();
    res
      .status(201)
      .json({ message: "Clothes added successfully", data: newClothes });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/clothe", async (req, res) => {
  try {
    const clothes = await Clothes.find().sort({ _id: -1 });
    res.json(clothes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/search", async (req, res) => {
  try {
    const { q: searchTerm, category, minPrice, maxPrice } = req.query;

    // Create a query object
    let query = {};

    // Add conditions based on the presence of query parameters
    if (searchTerm) {
      query.name = { $regex: searchTerm, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // Fetch products from the database
    const products = await Product.find(query).sort({ _id: -1 });

    // Send the result back to the client
    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.delete("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.deleteOne(); // Use deleteOne method instead of remove
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      theImage,
      images,
      video,
      publisher,
      price,
      quantity,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      category,
      theImage,
      images,
      video,
      publisher,
      price,
      quantity,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
