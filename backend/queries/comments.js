const db = require('../database/db');

const getCommentsByShowId = async (showId) => {
    await db.one('SELECT * FROM shows WHERE id=$1', showId)
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
    return await db.any(selectQuery, showId);
}


const getCommentsByShowTitleWithAllInfo = async (showTitle) => {
    const selectQuery = `
        SELECT 
            comment_body, 
            comments.user_id,
            username, 
            avatar_url
        FROM comments JOIN shows on show_id=shows.id
            JOIN users on comments.user_id=users.id
        WHERE title=$1
        ORDER BY comments.id DESC
    `
    return await db.any(selectQuery, showTitle);
}

module.exports = {
    getCommentsByShowId,
    createComment,
    getCommentsByShowIdWithAllInfo,
    getCommentsByShowTitleWithAllInfo,
  }