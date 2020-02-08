const express = require('express');
const router = express.Router();

const genresQuery = require('../queries/genres')
const { sendError, paramChecker } = require('./helpers/errorHandler')

//FUNCTION TO FORMAT NAMES
const normalizeGenreName = str => {
  str = str.trim()
  const arr = str.split(' ')
  let outputStr = '';
  for (let word of arr) {
      if (word && typeof word === 'string' && word !== ' ') {
          outputStr += word[0].toUpperCase() + (word.slice(1, word.length)).toLowerCase() + ' ';
      }
  }
  if (outputStr) {
      return outputStr.trim();
  }
  return str; 
}


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
  let genreName = request.body.genreName
  if (paramChecker(response, genreName)) {
    genreName = normalizeGenreName(genreName)
    try {
      const genre = await genresQuery.createGenre(genreName)
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
