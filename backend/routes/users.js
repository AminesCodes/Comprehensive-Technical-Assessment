const express = require('express');
const router = express.Router();

const usersQuery = require('../queries/users')
const { sendError, idChecker, paramChecker } = require('./helpers/errorHandler')



/* GET users listing. */
router.get('/', async (request, response) => {
  console.log('ok')
  try {
    const allUsers = await usersQuery.getAllUsers()
    response.json({
      error: false,
      message: 'Successfully retrieved all users',
      payload: allUsers
    })
  } catch (err) {
    sendError(response, err)
  }
});

/* GET user by ID. */
router.get('/:userId', async (request, response) => {
  const userId = request.params.userId
  if (idChecker(response, userId)) {
    try {
      const user = await usersQuery.getUserById(userId)
      response.json({
        error: false,
        message: `Successfully retrieved user with id ${userId}`,
        payload: user
      })
    } catch (err) {
      sendError(response, err)
    }
  }
});

/* POST: create a new user. */
router.post('/', async (request, response) => {
  const { username, avatarUrl } = request.body
  if (paramChecker(response, username) && paramChecker(response, avatarUrl)) {
    try {
      const user = await usersQuery.createUser(username, avatarUrl)
      response.json({
        error: false,
        message: 'Successfully created a new user',
        payload: user
      })
    } catch (err) {
      sendError(response, err)
    }
  }
});



module.exports = router;
