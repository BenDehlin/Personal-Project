SELECT * FROM messages
WHERE chatroom_id = $1
AND message_timestamp >= NOW() - INTERVAL '24 HOURS'
ORDER BY id DESC;