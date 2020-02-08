/*
GET	/comments/show/:show_id	Get all comments for specific show_id	n/a
POST	/comments	Add new comment	comment_body, user_id, show_id */

const db = require('../database/db');

const getCommentsByShowId = async (showId) => {
    return await db.any('SELECT * FROM comments WHERE show_id=$1', showId);
}

const createComment = async (commentBody, userId, showId) => {
    const insertQuery = `
        INSERT INTO comments (comment_body, user_id, show_id)
        VALUES ($1, $2, $3)
        RETURNING *
    `
    return await db.one(insertQuery, [commentBody, userId, showId])
}

// #################################################################
const getCommentsByShowIdWithAllInfo = async (showId) => {
    const selectQuery = `
        SELECT 
            comment_body, 
            comments.user_id, 
            show_id, 
            title, 
            shows.img_url AS show_img, 
            genre_id, 
            username, 
            avatar_url, 
            genre_name
        FROM comments JOIN shows on show_id=shows.id
            JOIN genres on genre_id=genres.id
            JOIN users on comments.user_id=users.id
        WHERE show_id=$1
    `
    return await db.any('SELECT * FROM comments WHERE show_id=$1', showId);
}

module.exports = {
    getCommentsByShowId,
    createComment,
    getCommentsByShowIdWithAllInfo,
  }