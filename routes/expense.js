const express = require('express');
const path = require('path');
const expenseController = require('../controller/expense')
const userauthentication = require('../middleware/auth')

const router = express.Router();
//  
  router.get('/getexpensespage', (req, res)=> {
    res.sendFile('addExpensePage.html', { root: './views' });
  });
  
  router.post('/addexpense', userauthentication.authenticate,  expenseController.addexpense )

  router.get('/getexpenses', userauthentication.authenticate ,  expenseController.getexpenses )
  
  router.delete('/deleteexpense/:expenseid', userauthentication.authenticate , expenseController.deleteexpense)
  

module.exports = router;