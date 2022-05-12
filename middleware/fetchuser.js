const jwt = require('jsonwebtoken');
const fetchuser = (req, res, next) => {
  //get the user from jwt token and add the id to the req object
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ errors: 'please authenticate using valid token' });
  }
  try {
    const data = jwt.verify(token, 'secret');
    req.user = data.user;
    // console.log('data send ')
    next();

  } catch (error) {
    console.error(error.message);
    return res.status(401).send({ errors: 'please authenticate using valid token' });
  }
}

module.exports = fetchuser;