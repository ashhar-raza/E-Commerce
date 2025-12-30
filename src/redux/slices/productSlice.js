import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../thunks/productThunk";


const productSlice = createSlice({
    name: "product",
    initialState: {
        allProducts: [],
        loading: true,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.allProducts = action.payload;
            })
            .addCase(getProduct.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch Products"
            })
    }
})

export default productSlice.reducer;