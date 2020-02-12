INSERT INTO chatroom_user_link (user_id, chatroom_id)
VALUES ($1, $2);
DELETE FROM chatroom_join_request
WHERE user_id = $1
AND chatroom_id = $2;