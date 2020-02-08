const express = require('express');
const router = express.Router();

const genresQuery = require('../queries/genres')
const { sendError, paramChecker, normalizeName } = require('./helpers/helpers')


/* GET all genres. */
router.get('/', async (request, response) => {
  try {
    const allGenres = await genresQuery.getAllGenres()
    response.json({
      error: false,
      message: 'Successfully retrieved all genres',
      payload: allGenres
    })
  } catch (err) {
    sendError(response, err)
  }
});

/* POST: create a new genre. */
router.post('/', async (request, response) => {
  let genre_name = request.body.genre_name
  if (paramChecker(response, genre_name)) {
    genre_name = normalizeName(genre_name)
    try {
      const genre = await genresQuery.createGenre(genre_name)
      response.json({
        error: false,
        message: 'Successfully created a new genre',
        payload: genre
      })
    } catch (err) {
      sendError(response, err)
    }
  }
});

module.exports = router;
