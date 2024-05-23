const conf = {
    appWriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appWriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appWriteUsersCollectionId : String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    appWriteOrdersCollectionId : String(import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID),
    appWriteCartCollectionId : String(import.meta.env.VITE_APPWRITE_CART_COLLECTION_ID),
    apiUrl : String(import.meta.env.VITE_API_URL)
}

export default conf;