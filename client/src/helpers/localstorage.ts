export const getTokenFromLocalStorage = (key: string): string | null => {
    const token = localStorage.getItem(key);
    return token ? token : null;
};

export const setTokenToLocalStorage = (key: string, token: string): void => {
    localStorage.setItem(key, token);
};

export const removeTokenFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
};