const Router = require('express-promise-router');
const db = require('../db');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const logger = require('log4js').getLogger('User Service');

//make a new router, so instead of app.use, or apt.get, we do router.get ect..
const router = new Router();

const jwtConstants = require('../jwtConstants');

// export our router to be mounted by the parent application
module.exports = router;

router.use(cookieParser());

//How the application checks the token
const checkJWT = (token) => {
  try{
    const payload = jwt.verify(token, jwtConstants.jwtSecret, {
      'algorithms': jwtConstants.jwtAlgo,
      'issuer': jwtConstants.appTLD,
    });
    return payload.sub;
  }
  catch(err){
    logger.info("JWT Invalid" + err);
    return false;
  }
}

//Checks token
router.use(function(req, res, next) {
  const uid = checkJWT(req.cookies['auth-token']);
  if(uid){
    req.authStatus = {'uid': uid, 'loggedIn': true};
    return next();
  }
  req.authStatus = {'uid': null, 'loggedIn': false};
  next();
});

router.get('/isLoggedIn', async (req, res) => {
    return res.status(200).json(req.authStatus);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  if(!req.authStatus.loggedIn){// Sees if I'm  not logged in.
    res.status(401);
    return res.json({status: 'error', 
      message: 'Not logged in.'});
  }

  if(req.authStatus.uid !== id){ // Checks that I'm looking at my own uid
    return res.json({status: 'error', message: 'Not your info.'});
  }

  const { rows } = await db.query('SELECT username, first_name, last_name, email FROM users WHERE userid = $1', [id]);

  return res.status(200).send(rows[0]);

});