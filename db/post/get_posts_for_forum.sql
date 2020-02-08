SELECT p.forum_id, p.user_id, p.post_content, p.post_img, u.username FROM posts p
JOIN forums f ON (p.forum_id = f.id)
JOIN users u ON (p.user_id = u.id)
WHERE f.id = $1;