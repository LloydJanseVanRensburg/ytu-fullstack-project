import pg from 'pg';
import { KEYS } from './keys.js';

const { Client } = pg;

export const client = new Client({
    connectionString: KEYS.DATABASE_URL,
});
