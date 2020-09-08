const express = require('express');
const router = express.Router();

const usersQuery = require('../queries/users')
const passport = require('../auth/passport')
const { hashPassword , checkUserLogged } = require('../auth/helpers')
const { sendError, idChecker, paramChecker, formatInputStr } = require('./helpers/helpers')

// LOGIN A USER
router.post('/login', passport.authenticate('local'), (request, response) => {
    const user = request.user
    response.json({
        error: false,
        message: 'Successfully logged user',
        payload: user,
    })
})


const signupUser = async (request, response, next) => {
    const { username, password, avatarUrl } = request.body
    if (paramChecker(response, username) 
        && paramChecker(response, password) 
        && paramChecker(response, avatarUrl) 
        ) {
        try {
            const parsedUsername = formatInputStr(username)
            const hashedPassword = await hashPassword(password)
            await usersQuery.createUser(username, parsedUsername, hashedPassword, avatarUrl)
            next()
        } catch (err) {
            // Username/email already taken 
            if (err.code === '23505' && err.detail.includes('already exists')) {
                console.log('Attempt to register a new user with a taken email/username')
                response.status(403)
                response.json({
                    error: true,
                    message: 'Username already taken AND/OR email address already registered',
                    payload: null,
                })
            } else {
                sendError(response, err)
            }
        }
    }
}

// SIGN UP A NEW USER
router.post('/signup', signupUser, passport.authenticate('local'), (request, response) => {
    const user = request.user
    response.status(201)
    response.json({
        error: false,
        message: 'Successfully signed up',
        payload: user,
    })
})

router.get('/logout', (request, response) => {
    request.logOut()
    response.json({
        error: false,
        message: 'User logged out successfully',
        payload: null,
    })
})
  
router.get('/isUserLoggedIn', checkUserLogged, (request, response) => {
    response.json({
        error: false,
        message: 'User is logged in. Session active',
        payload: request.user,
    })
})


const updateUser = async (request, response, next) => {
    const userId = request.params.userId
    const username = request.body.username || request.user.username
    const avatarUrl = request.body.avatarUrl || request.user.avatar_url
    const password = request.body.password 
    let newPassword = request.body.newPassword
    try {
        const parsedUsername = formatInputStr(username)
        if (parseInt(userId) === request.user.id && password) {
            if (newPassword) {
                const hashedPassword = await hashPassword(newPassword)
                await usersQuery.updateAllUserInfo(userId, username, parsedUsername, hashedPassword, avatarUrl)
                request.body.password = newPassword
            } else {
                await usersQuery.updateUserInfo(userId, username, parsedUsername, avatarUrl)
            }
            next()
        } else {
            console.log('Not authorized to update (non-personal profile or missing info)')
            response.status(403)
            response.json({
                error: true,
                message: 'Not authorized to update (non-personal profile or missing info)',
                payload: null,
            })
        }
        
    } catch (err) {
        // Username/email already taken 
        if (err.code === '23505' && err.detail.includes('already exists')) {
            console.log('Attempt to update user information with a taken email/username')
            response.status(403)
            response.json({
                error: true,
                message: 'Username already taken AND/OR email address already registered',
                payload: null,
            })
        } else {
            sendError(response, err)
        }
    }
}

router.put('/update/:userId', checkUserLogged, updateUser, passport.authenticate('local'), (request, response) => {
    const user = request.user
    response.json({
        status: 'success',
        message: 'Successfully update information',
        payload: user,
    })
})

router.delete('/:userId', checkUserLogged, async (request, response) => {
    const userId = request.params.userId
    if (parseInt(userId) === request.user.id) {
        try {
            await usersQuery.deleteUser(userId)
            request.logOut()
            response.json({
                error: false,
                message: 'User deleted successfully',
                payload: null,
            })
        } catch (err) {
            sendError(response, err)
        }
    } else {
        response.status(403)
        response.json({
            error: true,
            message: 'Not authorized to delete (non-personal profile)',
            payload: null,
        })
    }
})

module.exports = router;
