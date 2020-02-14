SELECT u.username, u.id AS user_id, c.id AS chatroom_id FROM users u
JOIN chatroom_user_link cl ON (cl.user_id = u.id)
JOIN chatrooms c ON (c.id = cl.chatroom_id)
WHERE c.id = $1;