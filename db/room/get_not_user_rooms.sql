SELECT DISTINCT c.id, c.chatroom_name FROM chatrooms c
LEFT JOIN chatroom_user_link cl ON (c.id = cl.chatroom_id)
WHERE cl.user_id IS NULL
OR cl.user_id <> $1;