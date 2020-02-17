SELECT s.id, s.user_id, u.username, s.score, s.time FROM scores s
JOIN users u ON (s.user_id = u.id)
WHERE u.id = $1
ORDER BY s.score DESC
LIMIT 1;