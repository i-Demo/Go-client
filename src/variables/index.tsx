export const apiUrl =
    process.env.NODE_ENV !== "production"
        ? "http://127.0.0.1:8000/api"
        : "http://127.0.0.1:8000/api";
export const LOCAL_STORAGE_CART_NAME = 'cart_shoes'
