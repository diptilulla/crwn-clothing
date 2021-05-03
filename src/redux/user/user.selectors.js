import { createSelector } from "reselect";

const selectUser = (state) => state.user;
// const selectCart = state => state.cart; if we want to use 2 selectors
export const selectCurrentUser = createSelector(
  [selectUser], //  [selectUser, selectCart],
  (user) => user.currentUser //(user, cart) => user.currentUser
);
