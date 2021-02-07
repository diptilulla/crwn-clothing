export const setCurrentUser = user => ({ //user passed through dispatch method
    type: 'SET_CURRENT_USER', //we user cap ecause this string will never change
    payload: user
});