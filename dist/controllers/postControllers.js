import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { client } from '../config/database.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function getAllPosts(req, res) {
    try {
        const getAllPostsQuery = fs
            .readFileSync(path.join(__dirname, '../sql/getAllPostsQuery.sql'))
            .toString();
        const response = await client.query(getAllPostsQuery);
        res.send({
            data: response.rows,
            count: response.rowCount,
        });
    }
    catch (error) {
        console.log(error);
    }
}
export async function createPost(req, res) {
    try {
        const postBody = req.body;
        const createPostQuery = fs
            .readFileSync(path.join(__dirname, '../sql/createPostQuery.sql'))
            .toString();
        const response = await client.query({
            text: createPostQuery,
            values: [postBody.title, postBody.body],
        });
        res.send({
            data: response.rows[0],
            count: response.rowCount,
        });
    }
    catch (error) {
        console.log(error);
    }
}
export async function getPostById(req, res) {
    try {
        const postId = req.params.id;
        const getPostByIdQuery = fs
            .readFileSync(path.join(__dirname, '../sql/getPostByIdQuery.sql'))
            .toString();
        const response = await client.query({
            text: getPostByIdQuery,
            values: [postId],
        });
        if (response.rowCount === 0) {
            return res.status(404).send({
                error: 'Not found',
            });
        }
        res.send({
            data: response.rows[0],
            count: response.rowCount,
        });
    }
    catch (error) {
        console.log(error);
    }
}
export async function updatePostById(req, res) {
    try {
        const postId = req.params.id;
        const putBody = req.body;
        const updatePostByIdQuery = fs
            .readFileSync(path.join(__dirname, '../sql/updatePostByIdQuery.sql'))
            .toString();
        const response = await client.query({
            text: updatePostByIdQuery,
            values: [postId, putBody.title, putBody.body],
        });
        if (response.rowCount === 0) {
            return res.status(404).send({
                error: 'Not found',
            });
        }
        res.send({
            data: response.rows[0],
            count: response.rowCount,
        });
    }
    catch (error) {
        console.log(error);
    }
}
export async function deletePostById(req, res) {
    try {
        const postId = req.params.id;
        const deletePostByIdQuery = fs
            .readFileSync(path.join(__dirname, '../sql/deletePostByIdQuery.sql'))
            .toString();
        const response = await client.query({
            text: deletePostByIdQuery,
            values: [postId],
        });
        if (response.rowCount === 0) {
            return res.status(404).send({
                error: 'Not found',
            });
        }
        res.send({
            data: response.rows[0],
            count: response.rowCount,
        });
    }
    catch (error) {
        console.log(error);
    }
}
