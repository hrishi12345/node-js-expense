const express = require('express');

const userController = require('../controller/user');

const router = express.Router();

router.get('/signup', (req, res)=> {
    res.sendFile('signup.html', { root: './views' });
  });
  router.get('/login', (req, res)=> {
    res.sendFile('login.html', { root: './views' });
  });
router.get('/forgotPassword',(req,res)=>{
  res.sendFile('forgotPassword.html',{root:'./views'})
})
router.post('/signup', userController.signup);

router.post('/login', userController.login)
router.post('/forgotPasswordDetails',userController.forgotPassword)
module.exports = router;