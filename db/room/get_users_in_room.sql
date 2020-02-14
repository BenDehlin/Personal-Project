SELECT cl.id, cl.chatroom_id, cl.user_id, c.chatroom_name, u.username FROM chatrooms c
JOIN chatroom_user_link cl ON (c.id = cl.chatroom_id)
JOIN users u ON (u.id = cl.user_id)
WHERE c.id = $1;