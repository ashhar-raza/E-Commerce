import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.products.find(
        (item) => item.id === product.id
      );

      if (!existingItem) {
        state.products.push({
          ...product,
          quantity: 1,
        });
      } else {
        existingItem.quantity += 1;
      }

      state.totalQuantity += 1;
      state.totalPrice += product.price;
    },

    removeItem: (state, action) => {
      const productId = action.payload;
      const existingItem = state.products.find(
        (item) => item.id === productId
      );

      if (!existingItem) return;

      existingItem.quantity -= 1;
      state.totalQuantity -= 1;
      state.totalPrice -= existingItem.price;

      if (existingItem.quantity === 0) {
        state.products = state.products.filter(
          (item) => item.id !== productId
        );
      }
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
