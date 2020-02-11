const express = require('express');
const router = express.Router();

const showsQuery = require('../queries/shows')
const { sendError, idChecker, paramChecker, normalizeName } = require('./helpers/helpers')


/* GET shows listing. */
router.get('/', async (request, response) => {
  try {
    const allShows = await showsQuery.getAllShowsWithAllInfo()
    response.json({
      error: false,
      message: 'Successfully retrieved all shows',
      payload: allShows
    })
  } catch (err) {
    sendError(response, err)
  }
});

/* GET show by ID. */
router.get('/:showId', async (request, response) => {
  const showId = request.params.showId
  if (idChecker(response, showId)) {
    try {
      const show = await showsQuery.getShowById(showId)
      response.json({
        error: false,
        message: `Successfully retrieved show with id ${showId}`,
        payload: show
      })
    } catch (err) {
      sendError(response, err)
    }
  }
});

/* POST: create a new show. */
router.post('/', async (request, response) => {
  const { title, img_url, user_id, genre_id } = request.body
  if (paramChecker(response, title) 
      && paramChecker(response, img_url) 
      && idChecker(response, user_id)
      && idChecker(response, genre_id)) {
    try {
      const normTitle = normalizeName(title)
      const show = await showsQuery.createShow(normTitle, img_url, user_id, genre_id)
      response.json({
        error: false,
        message: 'Successfully created a new show',
        payload: show
      })
    } catch (err) {
      sendError(response, err)
    }
  }
});


/* GET all show for specific genre. */
router.get('/genre/:genreId', async (request, response) => {
  const genreId = request.params.genreId
  if (idChecker(response, genreId)) {
    try {
      const shows = await showsQuery.getShowByGenreId(genreId)
      response.json({
        error: false,
        message: `Successfully retrieved all shows for genre id ${genreId}`,
        payload: shows
      })
    } catch (err) {
      sendError(response, err)
    }
  }
});


/* GET all show for specific user. */
router.get('/user/:userId', async (request, response) => {
  const userId = request.params.userId
  if (idChecker(response, userId)) {
    try {
      const shows = await showsQuery.getShowByUserIdWithGenreInfo(userId)
      response.json({
        error: false,
        message: `Successfully retrieved all shows for user id ${userId}`,
        payload: shows
      })
    } catch (err) {
      sendError(response, err)
    }
  }
});


/* GET all shows by title. */
router.get('/shows/:title', async (request, response) => {
  const title = request.params.title
  try {
    const shows = await showsQuery.getAllShowsWithAllInfoByTitle(title)
    response.json({
      error: false,
      message: `Successfully retrieved all shows: ${title}`,
      payload: shows
    })
  } catch (err) {
    sendError(response, err)
  }
});

/* GET specific for specific user. */
router.get('/show/:showId/:userId', async (request, response) => {
  const showId = request.params.showId
  const userId = request.params.userId
  if (idChecker(response, userId) && idChecker(response, userId)) {
    try {
      const shows = await showsQuery.getShowByShowIdAndUserId(showId, userId)
      response.json({
        error: false,
        message: `Successfully retrieved all shows for user id ${userId}`,
        payload: shows
      })
    } catch (err) {
      sendError(response, err)
    }
  }
});



module.exports = router;
