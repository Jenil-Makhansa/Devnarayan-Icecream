import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
const users = user == null ? null : user.users;

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    const url = `${process.env.REACT_APP_BASE_URL}/cart/${users._id}`;
    try {
      const resp = await axios(url);
      console.log(resp, "From cart sclice responce");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = state.cartItems.filter(() => 1 === 0);
      state.amount = 0;
    },
    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((item) => item.icecream._id !== payload);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.icecream._id === payload);
      cartItem.quantity = cartItem.quantity + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.icecream._id === payload);
      cartItem.quantity = cartItem.quantity - 1;
    },
    updatetotal: (state, { payload }) => {
      state.total = payload.total;
      state.amount = payload.items.length;
    },
    additem: (state, action) => {
      state.cartItems = action.payload.items;
      state.amount = action.payload.items.length;
      state.total = action.payload.total;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.items;
        state.amount = action.payload.items.length;
        state.total = action.payload.total;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

export const { clearCart, removeItem, increase, decrease, updatetotal, additem } =
  cartSlice.actions;

export default cartSlice.reducer;