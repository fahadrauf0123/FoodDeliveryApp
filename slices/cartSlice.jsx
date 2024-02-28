import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      for (const product of state.items) {
        if (action.payload.restaurantID != product.restaurantID) {
          state.items = [{ ...action.payload, quantity: 1 }];
          return
        }
        if (product._id == action.payload._id) {
          product.quantity = product.quantity + 1
          return
        }
      }
      state.items = [...state.items, { ...action.payload, quantity: 1 }];
    },
    removeFromCart: (state, action) => {
      let newCart = [...state.items];
      let itemIndex = state.items.findIndex(
        item => item._id == action.payload.id,
      );
      if (itemIndex >= 0) {
        newCart.splice(itemIndex, 1);
      } else {
        console.log("can't remove item as its not in the Cart");
      }
      state.items = newCart;
    },
    emptyCart: (state, action) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const selectCartItems = state => state.cart.items;

export const selectCartItemsById = (state, id) =>
  state.cart.items.find(item => item._id == id);
// export const selectCartItemsById = createSelector(
//   state => state.cart.items,
//   (items, id) => items.filter(item => item.menuId == id),
// );
export const selectCartTotal = state =>
  state.cart.items.reduce((total, item) => total = total += item.discounted ? Number(item.discountedPrice) * item.quantity : Number(item.price) * item.quantity, 0);
export default cartSlice.reducer;
