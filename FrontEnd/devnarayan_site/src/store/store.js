import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/User/userSlice";
import signupReducer from "../feature/User/signupSlice";
import cartReducer from "../feature/Cart/cartSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        signup: signupReducer,
        cart: cartReducer
    }
})

export default store; 