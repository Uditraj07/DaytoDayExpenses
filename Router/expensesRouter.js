const express=require('express')

const router=express.Router();

const expnessController=require('../Controllers/expenseController');

router.get('/',expnessController.expenses)

router.post('/add-expense',expnessController.addExpenses);

router.get('/get-all-expenses',expnessController.getAllExpenses);

router.get('/getallexpenses',expnessController.getallexpenses);

router.delete('/delete/:id',expnessController.delete);

router.put('/update/:id',expnessController.update);



module.exports=router;