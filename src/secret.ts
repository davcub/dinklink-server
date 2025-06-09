import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT;
export const ENV = process.env.ENV;

export const DB_USER = process.env.DB_USER;
export const DB_HOST = process.env.DB_HOST;
export const DB_NAME = process.env.DB_NAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_PORT = process.env.DB_PORT;

export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
export const AWS_PLACE_INDEX = process.env.AWS_PLACE_INDEX;
