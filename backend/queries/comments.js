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

module.exports = {
    getCommentsByShowId,
    createComment,
  }