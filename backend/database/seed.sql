DROP DATABASE if exists tvwatchlistapp;
CREATE DATABASE tvwatchlistapp;

\c tvwatchlistapp

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL UNIQUE,
    avatar_url VARCHAR NOT NULL
);

CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    genre_name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE shows (
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL,
    img_url VARCHAR NOT NULL,
    user_id INT REFERENCES users(id),
    genre_id INT REFERENCES genres(id)
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment_body VARCHAR NOT NULL,
    user_id INT REFERENCES users(id),
    show_id INT REFERENCES shows(id)
);

-- INSERT GENRES (https://en.wikipedia.org/wiki/List_of_genres)
INSERT INTO genres (genre_name) VALUES ('Adventure'); -- 1
INSERT INTO genres (genre_name) VALUES ('Drama'); -- 2
INSERT INTO genres (genre_name) VALUES ('Comedy'); -- 3
INSERT INTO genres (genre_name) VALUES ('Fantasy'); -- 4
INSERT INTO genres (genre_name) VALUES ('Absurdist/surreal/whimsical');
INSERT INTO genres (genre_name) VALUES ('Action');
INSERT INTO genres (genre_name) VALUES ('Crime');
INSERT INTO genres (genre_name) VALUES ('Historical');
INSERT INTO genres (genre_name) VALUES ('Historical fiction');
INSERT INTO genres (genre_name) VALUES ('Horror');
INSERT INTO genres (genre_name) VALUES ('Magical realism');
INSERT INTO genres (genre_name) VALUES ('Mystery');
INSERT INTO genres (genre_name) VALUES ('Paranoid fiction');
INSERT INTO genres (genre_name) VALUES ('Philosophical');
INSERT INTO genres (genre_name) VALUES ('Political');
INSERT INTO genres (genre_name) VALUES ('Romance');
INSERT INTO genres (genre_name) VALUES ('Saga');
INSERT INTO genres (genre_name) VALUES ('Satire');
INSERT INTO genres (genre_name) VALUES ('Science fiction');
INSERT INTO genres (genre_name) VALUES ('Social');
INSERT INTO genres (genre_name) VALUES ('Speculative');
INSERT INTO genres (genre_name) VALUES ('Thriller');
INSERT INTO genres (genre_name) VALUES ('Urban');
INSERT INTO genres (genre_name) VALUES ('Western');

-- INSERT USERS
INSERT INTO users (username, avatar_url) VALUES ('Jon Snow', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kit-harington-hair-jon-snow-1569167827.jpg?crop=0.439xw:0.878xh;0.0221xw,0.0306xh&resize=480:*'); -- 1
INSERT INTO users (username, avatar_url) VALUES ('Daenerys Targaryen', 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/36/1504608500-daenerys.jpg?crop=0.665xw:1.00xh;0.0950xw,0&resize=480:*'); -- 2
INSERT INTO users (username, avatar_url) VALUES ('Michael Scott', 'https://i1.sndcdn.com/avatars-000162505694-i81i0k-t500x500.jpg'); -- 3
INSERT INTO users (username, avatar_url) VALUES ('Pam Beesly', 'https://i1.sndcdn.com/avatars-000150274248-xnvnyn-t500x500.jpg'); -- 4

-- INSERT SHOWS
INSERT INTO shows (title, img_url, user_id, genre_id)
VALUES ('Game of Thrones', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg', 1, 4);
INSERT INTO shows (title, img_url, user_id, genre_id)
VALUES ('Game of Thrones', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg', 2, 4);
INSERT INTO shows (title, img_url, user_id, genre_id)
VALUES ('Game of Thrones', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg', 3, 4);
INSERT INTO shows (title, img_url, user_id, genre_id)
VALUES ('The Flash', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/jC1KqsFx8ZyqJyQa2Ohi7xgL7XC.jpg', 1, 1);
INSERT INTO shows (title, img_url, user_id, genre_id)
VALUES ('The Flash', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/jC1KqsFx8ZyqJyQa2Ohi7xgL7XC.jpg', 3, 1);
INSERT INTO shows (title, img_url, user_id, genre_id)
VALUES ('The Flash', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/jC1KqsFx8ZyqJyQa2Ohi7xgL7XC.jpg', 4, 1);
INSERT INTO shows (title, img_url, user_id, genre_id)
VALUES ('Naruto Shippūden', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/zAYRe2bJxpWTVrwwmBc00VFkAf4.jpg', 1, 4);
INSERT INTO shows (title, img_url, user_id, genre_id)
VALUES ('Naruto Shippūden', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/zAYRe2bJxpWTVrwwmBc00VFkAf4.jpg', 2, 4);
INSERT INTO shows (title, img_url, user_id, genre_id)
VALUES ('Greys Anatomy', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/eqgIOObafPJitt8JNh1LuO2fvqu.jpg', 3, 2);
INSERT INTO shows (title, img_url, user_id, genre_id)
VALUES ('Greys Anatomy', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/eqgIOObafPJitt8JNh1LuO2fvqu.jpg', 4, 2);
INSERT INTO shows (title, img_url, user_id, genre_id)
VALUES ('The Simpsons', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/yTZQkSsxUFJZJe67IenRM0AEklc.jpg', 1, 3);
INSERT INTO shows (title, img_url, user_id, genre_id)
VALUES ('The Simpsons', 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/yTZQkSsxUFJZJe67IenRM0AEklc.jpg', 4, 3);

-- INSERT COMMENTS
INSERT INTO comments (comment_body, user_id, show_id)
VALUES ('BEST SHOW EVER!!', 1, 1);
INSERT INTO comments (comment_body, user_id, show_id)
VALUES ('Of course you would think so Jon', 2, 1);




