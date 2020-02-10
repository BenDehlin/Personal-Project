SELECT c.id, c.chatroom_name FROM chatrooms c
JOIN chatroom_user_link cl ON (c.id = cl.chatroom_id)
JOIN users u ON(u.id = cl.user_id)
WHERE u.id = $1;