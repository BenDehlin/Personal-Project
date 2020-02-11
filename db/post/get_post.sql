-- SELECT * FROM posts WHERE id = $1;

SELECT p.id, p.forum_id, p.user_id, p.post_title, p.post_content, p.post_img, u.username 
FROM posts p
JOIN users u ON (p.user_id = u.id)
WHERE p.id = $1;