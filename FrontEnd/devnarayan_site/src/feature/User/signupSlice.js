import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk('signup/signupUser',
    async (usersCredential) => {

        try {
            const request = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, usersCredential);
            const response = await request.data;
            console.log(response,"Responce");
            localStorage.setItem('user', JSON.stringify(response));
            return response;
        } catch (err) {
            console.log(err);
            // return err;
            const errorMessage = err.response?.data?.message || 'An error occurred';
            throw new Error(errorMessage);
        }
    }
)

const userSlice = createSlice({
    name: 'signup',
    initialState: {
        loading: false,
        user: null,
        error: null

    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                console.log(action.error.message);
                if (action.error.message === 'Request failed with status code 401') {
                    state.error = 'Access Denied!';
                }
                else {
                    state.error = action.error.message;
                }
            })
    }
})

export default userSlice.reducer;