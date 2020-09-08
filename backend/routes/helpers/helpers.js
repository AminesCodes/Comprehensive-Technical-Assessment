const sendError = (response, err) => {
    if (err.code === "23505" && err.detail.includes("already exists") && err.table === 'users') {
      console.log('Attempt to register a new user with a taken email/username')
      response.status(403).json({
        error: true,
        message: 'Username already registered',
        payload: null,
      }) 
    } else if (err.code === "23505" && err.detail.includes("already exists") && err.table === 'shows_users') {
      console.log('Attempt to register a new user with a taken email/username')
      response.status(403).json({
        error: true,
        message: 'Show already registered to your list',
        payload: null,
      }) 
    } else if (err.message === 'No data returned from the query.') {
      console.log('No match for the selection')
      response.status(404).json({
        error: true,
        message: 'No match for the selection',
        payload: null,
      }) 
    } else if (err.code === '23503') {
      console.log('Query reference error')
      response.status(403).json({
        error: true,
        message: 'Reference error!',
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
            message: 'Bad request, Missing information',
            payload: null
          })
        return false
    }
    return true
}

//FUNCTION TO FORMAT NAMES
const normalizeName = str => {
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

const formatInputStr = username => {
  return username.toLowerCase().replace(/[^a-z0-9]/g, '')
}

module.exports = {
    sendError,
    idChecker,
    paramChecker,
    normalizeName,
    formatInputStr,
}