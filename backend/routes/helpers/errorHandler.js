const sendError = (response, err) => {
    if (err.code === "23505" && err.detail.includes("already exists")) {
      console.log('Attempt to register a new user with a taken email/username')
      response.status(403).json({
        error: true,
        message: 'Username already registered',
        payload: null,
      }) 
    } else {
      console.log(err)
      response.status(500).json({
        error: true,
        message: 'Sorry, something went wrong (D-B)',
        payload: null
      })
    }
}

const idChecker = (response, id) => {
    if (isNaN(parseInt(id)) || parseInt(id)+'' !== id+'') {
        response.status(404).json({
            error: true,
            message: 'Invalid route / parameter',
            payload: null
          })
        return false
    }
    return true
}

const paramChecker = (response, param) => {
    if (!param) {
        response.status(400).json({
            error: true,
            message: 'Bad request params',
            payload: null
          })
        return false
    }
    return true
}

module.exports = {
    sendError,
    idChecker,
    paramChecker,
}