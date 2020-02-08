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
    return await db.one('SELECT * FROM shows WHERE genre_id=$1', genreId)
}

const getShowByUserId = async (userId) => {
    return await db.one('SELECT * FROM shows WHERE user_id=$1', userId)
}

module.exports = {
    getAllShows,
    getShowById,
    createShow,
    getShowByGenreId,
    getShowByUserId,
  }