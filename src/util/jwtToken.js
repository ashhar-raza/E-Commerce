const TOKEN = "token";

export const getToken = () => {
    return localStorage.getItem(TOKEN);
}
export const addToken = (token) => {
    return localStorage.setItem(TOKEN, token);
}
export const deleteToken = () => {
    return localStorage.removeItem(TOKEN);
}