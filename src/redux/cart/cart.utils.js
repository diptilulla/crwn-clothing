export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id); //will return 1st item found in array based on condition that we pass in the func, if doesn't find anything then return undefined
    console.log(existingCartItem);

    if (existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1} //we need to increase quantity
            : cartItem //no need to update
        ) //map will eturn new array and we need to new versions of state so that component rerenders properly
    }
    else {
    return [...cartItems, {...cartItemToAdd, quantity: 1}] //quant property gets attached the first time here since if block not run and we spread all items in array cartItems and add another item that is the cartItemToAdd with base quantity of 1 and whenever we add this time again it'll have a quantity property to increment
    }
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id )
    }

    return cartItems.map(
        cartItem => cartItem.id === cartItemToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
}