import CartActionTypes from './cart.types';

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
}); 
// we don't need payload as we aren't using payload in reducer we just switch hidden state to its opposite when action dispatched
export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
});