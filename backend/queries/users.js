const db = require('../database/db');

const getAllUsers = async () => {
    return await db.any('SELECT id, username, avatar_url FROM users');
}

const getUserById = async (id) => {
    return await db.one('SELECT id, username, avatar_url FROM users WHERE id=$1', id)
}

const getUserByUsername = async (parsedUsername) => {
    return await db.oneOrNone('SELECT * FROM users WHERE parsed_username=$1', parsedUsername)
}

const createUser = async (username, parsedUsername, password, avatarUrl) => {
    const insertQuery = `
        INSERT INTO users (username, parsed_username, password, avatar_url) 
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `
    return await db.one(insertQuery, [username, parsedUsername, password, avatarUrl])
}

const updateUserInfo = async (userId, username, parsedUsername, avatarUrl) => {
    const updateQuery = `
        UPDATE users
        SET username=$2, parsed_username=$3, avatar_url=$4
        WHERE id=$1
        RETURNING *
    `
    return await db.one(updateQuery, [userId, username, parsedUsername, avatarUrl])
}

const updateAllUserInfo = async (userId, username, parsedUsername, password, avatarUrl) => {
    const updateQuery = `
        UPDATE users
        SET username=$2, parsed_username=$3, password=$4, avatar_url=$5
        WHERE id=$1
        RETURNING *
    `
    return await db.one(updateQuery, [userId, username, parsedUsername, password, avatarUrl])
}

const deleteUser = async (userId) => {
    return await db.one('DELETE FROM users WHERE id=$1 RETURNING *', userId)
}


module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    updateUserInfo,
    updateAllUserInfo,
    deleteUser,
  }