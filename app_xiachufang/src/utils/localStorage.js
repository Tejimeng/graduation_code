import { tokenName } from '../../constant/token.js';

export const setLocalToken = (token) => {
    localStorage.setItem(tokenName, token);
};

export const getLocalToken = () => {
    return localStorage.getItem(tokenName);
};

export const clearToken = () => {
    localStorage.removeItem(tokenName);
};