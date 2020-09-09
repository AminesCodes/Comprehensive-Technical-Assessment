-- DROP DATABASE IF EXISTS tv_watch_list_app;
-- CREATE DATABASE tv_watch_list_app;

-- \c tv_watch_list_app

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS shows_users;
DROP TABLE IF EXISTS shows;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL UNIQUE,
    parsed_username VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    avatar_url VARCHAR NOT NULL
);

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    genre_name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE shows (
    id SERIAL PRIMARY KEY,
    title VARCHAR UNIQUE NOT NULL,
    formatted_title VARCHAR UNIQUE NOT NULL,
    img_url VARCHAR UNIQUE NOT NULL,
    genre_id INT REFERENCES genres(id) ON DELETE CASCADE
);

CREATE TABLE shows_users (
    id SERIAL PRIMARY KEY,
    show_id INT REFERENCES shows(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (show_id, user_id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment_body VARCHAR NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    show_id INT REFERENCES shows(id) ON DELETE CASCADE
);

-- INSERT GENRES (https://en.wikipedia.org/wiki/List_of_genres)
INSERT INTO genres (genre_name) VALUES 
    ('Adventure'),
    ('Drama'),
    ('Comedy'),
    ('Fantasy'),
    ('Absurdist/surreal/whimsical'),
    ('Action'),
    ('Crime'),
    ('Historical'),
    ('Historical fiction'),
    ('Horror'),
    ('Magical realism'),
    ('Mystery'),
    ('Paranoid fiction'),
    ('Philosophical'),
    ('Political'),
    ('Romance'),
    ('Saga'),
    ('Satire'),
    ('Science fiction'),
    ('Social'),
    ('Speculative'),
    ('Thriller'),
    ('Urban'),
    ('Western');

-- INSERT USERS
INSERT INTO users (username, parsed_username, password, avatar_url) VALUES 
    ('Jon Snow', 'jonsnow', '$2b$12$raSIhSMs84t9i75CsFdE5.L66Cqt5Ew.cbwuPW1M5VXM2rR.Xwh0W', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kit-harington-hair-jon-snow-1569167827.jpg?crop=0.439xw:0.878xh;0.0221xw,0.0306xh&resize=480:*'), -- 1
    ('Daenerys Targaryen', 'daenerystargaryen', '$2b$12$raSIhSMs84t9i75CsFdE5.L66Cqt5Ew.cbwuPW1M5VXM2rR.Xwh0W', 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/36/1504608500-daenerys.jpg?crop=0.665xw:1.00xh;0.0950xw,0&resize=480:*'), -- 2
    ('Michael Scott', 'michaelscott', '$2b$12$raSIhSMs84t9i75CsFdE5.L66Cqt5Ew.cbwuPW1M5VXM2rR.Xwh0W', 'https://i1.sndcdn.com/avatars-000162505694-i81i0k-t500x500.jpg'), -- 3
    ('Pam Beesly', 'pambeesly', '$2b$12$raSIhSMs84t9i75CsFdE5.L66Cqt5Ew.cbwuPW1M5VXM2rR.Xwh0W', 'https://i1.sndcdn.com/avatars-000150274248-xnvnyn-t500x500.jpg'); -- 4

-- INSERT SHOWS
INSERT INTO shows (title, formatted_title, img_url, genre_id) VALUES 
    ('Game of Thrones', 'gameofthrones', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg', 4),
    ('The Flash', 'theflash', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/jC1KqsFx8ZyqJyQa2Ohi7xgL7XC.jpg', 1),
    ('Naruto Shippuden', 'narutoshippuden', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/zAYRe2bJxpWTVrwwmBc00VFkAf4.jpg', 4),
    ('Greys Anatomy', 'greysanatomy', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/eqgIOObafPJitt8JNh1LuO2fvqu.jpg', 2),
    ('The Simpsons', 'thesimpsons', 'https://image.tmdb.org/t/p/w1280/qcr9bBY6MVeLzriKCmJOv1562uY.jpg', 3);

-- INSERT SHOWS_USERS
INSERT INTO shows_users (show_id, user_id) VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 1),
    (2, 3),
    (2, 4),
    (3, 1),
    (3, 2),
    (4, 3),
    (4, 4),
    (5, 1),
    (5, 4);

-- INSERT COMMENTS
INSERT INTO comments (comment_body, user_id, show_id)
VALUES ('BEST SHOW EVER!!', 1, 1);
INSERT INTO comments (comment_body, user_id, show_id)
VALUES ('Of course you would think so Jon', 2, 1);




