import cors from 'cors';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { client } from './config/database.js';
import { KEYS } from './config/keys.js';
import postRoutes from './routes/postRoutes.js';
const app = express();
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://195.110.58.87:3000',
        'https://postnet.tech',
    ],
}));
app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req, res) => {
    res.send('API is running');
});
app.use('/posts', postRoutes);
app.listen(KEYS.PORT, async () => {
    console.log(`Server running on PORT ${KEYS.PORT}`);
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        await client.connect();
        // Create table
        const createTableQuery = fs
            .readFileSync(path.join(__dirname, '/sql/createTableQuery.sql'))
            .toString();
        await client.query(createTableQuery);
        // Delete all post
        const deleteAllPostsQuery = fs
            .readFileSync(path.join(__dirname, '/sql/deleteAllPostsQuery.sql'))
            .toString();
        await client.query(deleteAllPostsQuery);
        // Insert dummy posts
        const createDummyPostsQuery = fs
            .readFileSync(path.join(__dirname, '/sql/createDummyPostsQuery.sql'))
            .toString();
        await client.query(createDummyPostsQuery);
        console.log('DB Connected');
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=index.js.map