const db = require('../database/db');

const getAllUsers = async () => {
    return await db.any('SELECT * FROM users');
}

const getUserById = async (id) => {
    return await db.one('SELECT * FROM users WHERE id=$1', id)
}

const createUser = async (username, avatarUrl) => {
    const insertQuery = `
        INSERT INTO users (username, avatar_url) 
        VALUES ($1, $2)
        RETURNING *
    `
    return await db.one(insertQuery, [username, avatarUrl])
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
  }