SELECT cr.id, cr.chatroom_id, cr.user_id, c.chatroom_name, u.username 
FROM chatrooms c
JOIN chatroom_join_request cr ON (c.id = cr.chatroom_id)
JOIN users u ON (u.id = cr.user_id)
WHERE c.id = $1;