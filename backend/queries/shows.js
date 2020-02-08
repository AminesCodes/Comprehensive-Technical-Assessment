const db = require('../database/db');

const getAllShows = async () => {
    return await db.any('SELECT * FROM shows');
}

const getShowById = async (id) => {
    return await db.one('SELECT * FROM shows WHERE id=$1', id)
}

const createShow = async (title, imgUrl, userId, genreId) => {
    const insertQuery = `
        INSERT INTO shows (title, img_url, user_id, genre_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `
    return await db.one(insertQuery, [title, imgUrl, userId, genreId])
}

const getShowByGenreId = async (genreId) => {
    return await db.any('SELECT * FROM shows WHERE genre_id=$1', genreId)
}

const getShowByUserId = async (userId) => {
    return await db.any('SELECT * FROM shows WHERE user_id=$1', userId)
}

//#########################################################################
const getAllShowsWithAllInfo = async () => {
    const selectQuery = `
        SELECT 
            title, 
            shows.img_url AS show_img, 
            user_id, 
            genre_id, 
            username, 
            avatar_url, 
            genre_name
        FROM shows JOIN genres ON genre_id=genres.id
            JOIN users ON user_id=users.id
    `
    return await db.any(selectQuery);
}

const getShowByIdWithAllInfo = async (id) => {
    const selectQuery = `
        SELECT 
            title, 
            shows.img_url AS show_img, 
            user_id, 
            genre_id, 
            username, 
            avatar_url, 
            genre_name
        FROM shows JOIN genres ON genre_id=genres.id
            JOIN users ON user_id=users.id
        WHERE id=$1
    `
    return await db.one(selectQuery, id)
}

const getShowByGenreIdWithAllInfo = async (genreId) => {
    const selectQuery = `
        SELECT 
            title, 
            shows.img_url AS show_img, 
            user_id, 
            genre_id, 
            username, 
            avatar_url, 
            genre_name
        FROM shows JOIN genres ON genre_id=genres.id
            JOIN users ON user_id=users.id
        WHERE genre_id=$1
    `
    return await db.any(selectQuery, genreId)
}

const getShowByUserIdWithAllInfo = async (userId) => {
    const selectQuery = `
        SELECT 
            title, 
            shows.img_url AS show_img, 
            user_id, 
            genre_id, 
            username, 
            avatar_url, 
            genre_name
        FROM shows JOIN genres ON genre_id=genres.id
            JOIN users ON user_id=users.id
        WHERE user_id=$1
    `
    return await db.any(selectQuery, userId)
}

module.exports = {
    getAllShows,
    getShowById,
    createShow,
    getShowByGenreId,
    getShowByUserId,
    getAllShowsWithAllInfo,
    getShowByIdWithAllInfo,
    getShowByGenreIdWithAllInfo,
    getShowByUserIdWithAllInfo,
  }