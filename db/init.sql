DROP TABLE IF EXISTS chatroom_user_link;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS chatrooms;
DROP TABLE IF EXISTS forums;
DROP TABLE IF EXISTS users;

CREATE TABLE users 
(id SERIAL PRIMARY KEY,
is_admin BOOLEAN,
username VARCHAR(20) NOT NULL, 
first VARCHAR(20) NOT NULL, 
last VARCHAR(20) NOT NULL, 
email VARCHAR(200) NOT NULL, 
hash VARCHAR(2000) NOT NULL,
img VARCHAR(200), 
age INTEGER);


CREATE TABLE chatrooms
(id SERIAL PRIMARY KEY,
chatroom_name VARCHAR(20) NOT NULL);

CREATE TABLE messages
(id SERIAL PRIMARY KEY,
message_content VARCHAR(200) NOT NULL,
user_id INTEGER REFERENCES users(id),
chatroom_id INTEGER REFERENCES chatrooms(id));

CREATE TABLE chatroom_user_link
(id SERIAL PRIMARY KEY,
chatroom_id INTEGER REFERENCES chatrooms(id),
user_id INTEGER REFERENCES users(id));

CREATE TABLE forums
(id SERIAL PRIMARY KEY, 
forum_name VARCHAR(20) NOT NULL);

CREATE TABLE posts
(id SERIAL PRIMARY KEY,
post_title VARCHAR(20) NOT NULL,
post_content VARCHAR(2500) NOT NULL,
post_img VARCHAR(200),
user_id INTEGER REFERENCES users(id),
forum_id INTEGER REFERENCES forums(id));

CREATE TABLE chatroom_join_request
(id SERIAL PRIMARY KEY,
chatroom_id INTEGER REFERENCES chatrooms(id),
user_id INTEGER REFERENCES users(id),
approved BOOLEAN);

SELECT * FROM messages ORDER BY id DESC;
SELECT * FROM users ORDER BY id DESC;
SELECT * FROM chatrooms ORDER BY id DESC;
SELECT * FROM chatroom_user_link ORDER BY id DESC;
SELECT * FROM forums ORDER BY id DESC;
SELECT * FROM posts ORDER BY id DESC;