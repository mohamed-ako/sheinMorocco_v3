import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://your-backend-url.com"; // Replace with your actual backend URL

// Initial state for products
// Products Initial State
const productsInitialState = {
  products: [],
  filteredProducts: [],
  status: "idle",
  error: null,
  searchTerm: "",
  selectedCategory: "",
};

// Stickers Initial State
const stickersInitialState = {
  stickers: [],
  status: "idle",
  error: null,
};

// Clothes Initial State
const clothesInitialState = {
  clothes: [],
  status: "idle",
  error: null,
};

// Cart Initial State
const cartInitialState = {
  cartItems: [],
};

// Admin Initial State
const adminInitialState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://sheinmoroocco.onrender.com/products"
    );
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    const response = await axios.post(
      "https://sheinmoroocco.onrender.com/products",
      productData
    );
    return response.data;
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (productData) => {
    const { id, ...updatedData } = productData;
    const response = await axios.put(
      `https://sheinmoroocco.onrender.com/products/${id}`,
      updatedData
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    await axios.delete(
      `https://sheinmoroocco.onrender.com/products/${productId}`
    );
    return productId;
  }
);
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (searchTerm) => {
    const response = await axios.get(
      `http://localhost:5000/search?q=${encodeURIComponent(searchTerm)}`
    );
    return response.data;
  }
);

// Products slice
const productsSlice = createSlice({
  name: "products",
  initialState: productsInitialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = "";
      state.selectedCategory = "";
      state.filteredProducts = state.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredProducts = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = {
            ...state.products[index],
            ...action.payload,
          };
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      });
  },
});

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (productId) => productId !== action.payload
      );
    },
  },
});

// Admin slice
const adminSlice = createSlice({
  name: "admin",
  initialState: adminInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to login";
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = "idle";
        state.error = null;
      });
  },
});


const stickersSlice = createSlice({
  name: "stickers",
  initialState: stickersInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStickers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStickers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stickers = action.payload;
      })
      .addCase(fetchStickers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const clothesSlice = createSlice({
  name: "clothes",
  initialState: clothesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClothes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClothes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clothes = action.payload;
      })
      .addCase(fetchClothes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


// Export actions and selectors
export const { addToCart, removeFromCart } = cartSlice.actions;
export const { setSearchTerm, setSelectedCategory, clearFilters } =
  productsSlice.actions;
export const { login, logout } = adminSlice.actions;

export const selectAllStickers = (state) => state.stickers.stickers;
export const selectStickersStatus = (state) => state.stickers.status;
export const selectStickersError = (state) => state.stickers.error;

export const selectAllClothes = (state) => state.clothes.clothes;
export const selectClothesStatus = (state) => state.clothes.status;
export const selectClothesError = (state) => state.clothes.error;


export const selectCart = (state) => state.cart.cart;
export const selectAllProducts = (state) => state.products.products;
export const selectFilteredProducts = (state) =>
  state.products.filteredProducts;
// export const selectLoggedIn = (state) => state.admin.loggedIn;
// export const selectIsAdmin = (state) => state.admin.isAdmin;

export const selectCurrentUser = (state) => state.admin.user;
export const selectAuthToken = (state) => state.admin.token;
export const selectAdminStatus = (state) => state.admin.status;
export const selectAdminError = (state) => state.admin.error;
export const selectIsAuthenticated = (state) => Boolean(state.admin.token);

// Configure store
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
    admin: adminSlice.reducer,
  },
});

// Export store
export default store;
