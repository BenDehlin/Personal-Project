UPDATE posts
SET (post_title, post_content, post_img) = ($2, $3, $4)
WHERE id = $1;