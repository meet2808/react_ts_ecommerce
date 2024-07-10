const conf = {
    productApi : String(import.meta.env.VITE_PRODUCT_API),
    dbApi : String(import.meta.env.VITE_DB_API),
    stripeKey : String(import.meta.env.VITE_STRIPE_PUBLISH_KEY)
}

export default conf;