import { createClient } from 'redis';
import dotenv from "dotenv";

dotenv.config();

export const getClient = async (): Promise<ReturnType<typeof createClient>> => await createClient({
    url: process.env.REDIS
})
    .on('error', err => console.log('Redis Client Error', err))
    .connect();
