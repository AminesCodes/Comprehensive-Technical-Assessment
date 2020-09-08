const db = require('../database/db');

const { formatInputStr } = require('../routes/helpers/helpers');

const selectQuery = `
    SELECT 
        title,
        shows.id AS show_id,
        img_url, 
        array_agg(user_id) AS users_ids, 
        array_agg(username) AS usernames, 
        genre_id, 
        genre_name
    FROM shows 
        JOIN genres ON genre_id=genres.id
        JOIN shows_users ON shows.id=shows_users.show_id
        JOIN users ON user_id=users.id
    `
const groupClause = 
    `
        GROUP BY title, shows.id, genre_name
    `

const getAllShows = async () => {
    return await db.any(selectQuery + groupClause);
}

const getShowById = async (id) => {
    return await db.one(selectQuery + 'WHERE shows.id=$1' + groupClause, id);
}

const getShowByTitle = async (title) => {
    const formattedTitle = formatInputStr(title);
    return await db.one(selectQuery + 'WHERE formatted_title=$1' + groupClause, formattedTitle);
}


const createShow = async (title, imgUrl, userId, genreId) => {
    const formattedTitle = formatInputStr(title);
    let showId = await db.oneOrNone('SELECT id FROM shows WHERE formatted_title=$1', formattedTitle);

    if (!showId) {
        const insertQuery = `
            INSERT INTO shows (title, formatted_title, img_url, genre_id)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `
        showId = await db.one(insertQuery, [title, formattedTitle, imgUrl, genreId]);
    }

    const insertQuery = `
        INSERT INTO shows_users (show_id, user_id)
        VALUES ($1, $2)
        RETURNING *
    `;
    return await db.one(insertQuery, [showId.id, userId]);
}

const getShowByGenreId = async (genreId) => {
    // Check to see if a genre exist, will throw an error of non-existing id
    await db.one('SELECT * FROM genres WHERE id=$1', genreId);

    return await db.any(selectQuery + 'WHERE genre_id=$1' + groupClause, genreId)
}

const getShowByUserId = async (userId) => {
    // Check to see if a user exist, will throw an error of non-existing id
    await db.one('SELECT * FROM users WHERE id=$1', userId);

    const selectQuery = `
        SELECT 
            shows.id as show_id,
            title, 
            img_url, 
            genre_id,  
            genre_name
        FROM shows_users JOIN shows ON show_id=shows.id JOIN genres ON genre_id=genres.id
        WHERE user_id=$1
    `
    return await db.any(selectQuery, userId);
}

const getShowByShowIdAndUserId = async (showId, userId) => {
    const selectQuery = `
        SELECT 
            shows.id AS show_id,
            title, 
            img_url,
            user_id,
            username,
            genre_id,
            genre_name AS genre
        FROM shows 
            JOIN shows_users ON shows_users.show_id=shows.id
            JOIN users ON user_id=users.id
            JOIN genres ON genre_id = genres.id
        WHERE shows.id=$1 
            AND user_id=$2
        `
    return await db.one(selectQuery, [showId, userId])
}


module.exports = {
    getAllShows,
    getShowById,
    getShowByTitle,
    createShow,
    getShowByGenreId,
    getShowByUserId,
    getShowByShowIdAndUserId,
  }