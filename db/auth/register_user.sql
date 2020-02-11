INSERT INTO users
(username, first, last, email, hash, img, age, is_admin)
VALUES
(${username}, ${first}, ${last}, ${email}, ${hash}, ${img}, ${age}, false)
RETURNING username, first, last, email, img, age, is_admin;