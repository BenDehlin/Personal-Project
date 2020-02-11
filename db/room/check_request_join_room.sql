SELECT * FROM chatroom_join_request
WHERE user_id = $1
AND chatroom_id = $2;