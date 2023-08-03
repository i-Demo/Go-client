export const apiUrl =
    process.env.NODE_ENV !== "production"
        ? "http://localhost:5000/api/v1"
        : "https://shoeserver.vercel.app/api/v1";
export const LOCAL_STORAGE_CART_NAME = 'cart_shoes'
