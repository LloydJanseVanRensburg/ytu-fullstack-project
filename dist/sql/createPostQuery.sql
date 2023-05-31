INSERT INTO post (title, body) 
VALUES ($1, $2)
RETURNING *;