SELECT cl.user_id, c.chatroom_name, cl.chatroom_id FROM users u 
JOIN chatroom_join_request cl ON (cl.user_id = u.id)
JOIN chatrooms c ON (cl.chatroom_id = c.id)
WHERE u.id = $1;