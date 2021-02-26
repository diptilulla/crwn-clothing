import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({ //user passed through dispatch method
    type: UserActionTypes.SET_CURRENT_USER, //we user cap ecause this string will never change
    payload: user
});