import cors from 'cors';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import { client } from './config/database.js';
import { KEYS } from './config/keys.js';
import postRoutes from './routes/postRoutes.js';

const app = express();

app.use(
    cors({
        origin: [
            'http://127.0.0.1:3000',
            'http://195.110.58.87:3000',
            'https://postnet.tech',
        ],
    })
);
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/posts', postRoutes);

app.listen(KEYS.PORT, async () => {
    console.log(`Server running on PORT ${KEYS.PORT}`);
    try {
        await client.connect();

        // Create table
        const createTableQuery = fs
            .readFileSync('./sql/createTableQuery.sql')
            .toString();
        await client.query(createTableQuery);

        // Delete all post
        const deleteAllPostsQuery = fs
            .readFileSync('./sql/deleteAllPostsQuery.sql')
            .toString();
        await client.query(deleteAllPostsQuery);

        // Insert dummy posts
        const createDummyPostsQuery = fs
            .readFileSync('./sql/createDummyPostsQuery.sql')
            .toString();
        await client.query(createDummyPostsQuery);

        console.log('DB Connected');
    } catch (error) {
        console.log(error);
    }
});
