export const getTokenFromLocalStorage = (key: string): string => {
    const token = localStorage.getItem(key);
    return token ? token : '';
};

export const setTokenToLocalStorage = (key: string, token: string): void => {
    localStorage.setItem(key, JSON.stringify(token));
};

export const removeTokenFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
};