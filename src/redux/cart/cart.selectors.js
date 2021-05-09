import { createSelector } from "reselect"; //to cache and now we an reuse this selector
//2 types of selectors - input selectors - don't use createSelector, & output selectors - use input selecto and creatSelector
//input selector - func which takes whole state and just returns a lice of it - 1 layer deep usually
const selectCart = (state) => state.cart; //we want cart reducer out of root reducer/state

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItems = createSelector(
  //memoized selector
  [selectCart], //1st arg-array of input selector
  (cart) => cart.cartItems //func which returns the value we want out of this selector, parameter is output of input selector in the order they were writtem
);

export const selectCartItemsCount = createSelector(
  [selectCartItems], //can also take other selector apart from i/p selector
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem)   =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
