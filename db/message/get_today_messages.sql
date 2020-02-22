SELECT m.id, m.message_content, m.user_id, m.chatroom_id, m.message_timestamp, m.username, c.chatroom_name FROM messages m
JOIN chatrooms c ON (m.chatroom_id = c.id)
WHERE m.chatroom_id = $1
AND m.message_timestamp >= NOW() - INTERVAL '24 HOURS'
ORDER BY m.id DESC;