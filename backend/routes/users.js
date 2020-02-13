const express = require('express');
const router = express.Router();

const usersQuery = require('../queries/users')
const { sendError, idChecker, paramChecker } = require('./helpers/helpers')


/* GET users listing. */
router.get('/', async (request, response) => {
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
  let id='number'
  if (isNaN(parseInt(userId)) || parseInt(userId)+'' !== userId+''){
    id='username'
  }
  try {
    let user = null
    if (id === 'number' && idChecker(response, userId)) {
      user = await usersQuery.getUserById(userId)
    } else {
      user = await usersQuery.getUserByUsername(userId)
    }
    response.json({
      error: false,
      message: `Successfully retrieved user with id/username ${userId}`,
      payload: user
    })
  } catch (err) {
    sendError(response, err)
  }
});



module.exports = router;
