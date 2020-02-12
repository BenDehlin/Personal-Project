DELETE FROM chatroom_user_link
WHERE user_id = $1
AND chatroom_id = $2;