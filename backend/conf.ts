import dotenv from 'dotenv';

dotenv.config()

const conf = {
    PORT : Number(process.env.PORT),
    DB_URL : String(process.env.DB_URL),
    JWT_TOKEN : String(process.env.JWT_TOKEN),
    STRIPE_KEY : String(process.env.STRIPE_SECRET_KEY)
}

export { conf };