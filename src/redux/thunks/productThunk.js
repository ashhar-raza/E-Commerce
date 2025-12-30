import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";


export const getProduct = createAsyncThunk(
    "product/getProduct" , async(__,{rejectWithValue})=>{

        try {
            const response = await axiosInstance.get('/products');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error getting products");
        }
    }
)