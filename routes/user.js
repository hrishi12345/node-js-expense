const express = require('express');

const userController = require('../controller/user');
const authenticatemiddleware = require('../middleware/auth');
const expenseController = require('../controller/expense')

const router = express.Router();

router.get('/signup', (req, res)=> {
    res.sendFile('signup.html', { root: './views' });
  });
  router.get('/login', (req, res)=> {
    res.sendFile('login.html', { root: './views' });
  });


router.post('/signup', userController.signup);
router.post('/login', userController.login)

module.exports = router;