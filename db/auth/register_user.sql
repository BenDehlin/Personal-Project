INSERT INTO users
(username, first, last, email, hash, img, age)
VALUES
(${username}, ${first}, ${last}, ${email}, ${hash}, ${img}, ${age})
RETURNING username, first, last, email, img, age;