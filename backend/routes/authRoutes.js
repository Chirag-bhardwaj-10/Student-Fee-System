// const express = require('express');
// const router = express.Router();
// //const { register, login } = require(__dirname + '/controllers/authController');
// const { register, login } = require('../controllers/authController');
// router.post('/register', register);
// router.post('/login', login);

// module.exports = router;
const express = require('express');
const path = require('path');
const router = express.Router();

// Construct and verify the path
const controllerPath = path.join(__dirname, '..', 'controllers', 'authController');
console.log('Loading from:', controllerPath);

const { register, login } = require(controllerPath);

router.post('/register', register);
router.post('/login', login);
module.exports = router;