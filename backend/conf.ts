import dotenv from 'dotenv';

dotenv.config()

const conf = {
    PORT : Number(process.env.PORT),
    DB_URL : String(process.env.DB_URL),
    JWT_TOKEN : String(process.env.JWT_TOKEN),
    STRIPE_KEY : String(process.env.STRIPE_SECRET_KEY),
    GMAIL : String(process.env.GMAIL),
    GMAIL_PASSWORD: String(process.env.GMAIL_PASSWORD),
    EMAIL_TOKEN_SECRET: String(process.env.EMAIL_TOKEN_SECRET)
}

export { conf };