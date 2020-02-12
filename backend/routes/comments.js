const express = require('express');
const router = express.Router();

const commentsQuery = require('../queries/comments')
const { sendError, idChecker, paramChecker } = require('./helpers/helpers')


/* GET all comments related a show (showId). */
router.get('/show/:showId', async (request, response) => {
  const showId = request.params.showId
  if (idChecker(response, showId)) {
    try {
      const allComments = await commentsQuery.getCommentsByShowIdWithAllInfo(showId)
      response.json({
        error: false,
        message: `Successfully retrieved all comments related to show id ${showId}`,
        payload: allComments
      })
    } catch (err) {
      sendError(response, err)
    }
  }
});

/* GET all comments related a show (By Title). */
router.put('/shows/', async (request, response) => {
  const showTitle = request.body.showTitle
  if (paramChecker(response, showTitle)) {
    try {
      const allComments = await commentsQuery.getCommentsByShowTitleWithAllInfo(showTitle)
      response.json({
        error: false,
        message: `Successfully retrieved all comments related to ${showTitle}`,
        payload: allComments
      })
    } catch (err) {
      sendError(response, err)
    }
  }
});


/* POST: create a new comment. */
router.post('/', async (request, response) => {
  const { comment_body, user_id, show_id } = request.body
  if (paramChecker(response, comment_body) 
      && idChecker(response, user_id)
      && idChecker(response, show_id)) {
    try {
      const comment = await commentsQuery.createComment(comment_body, user_id, show_id)
      response.json({
        error: false,
        message: 'Successfully created a new comment',
        payload: comment
      })
    } catch (err) {
      sendError(response, err)
    }
  }
});


module.exports = router;
