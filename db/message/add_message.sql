INSERT INTO messages (user_id, chatroom_id, username, message_content, message_timestamp)
VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
RETURNING *;