const express=require('express')

const router=express.Router();

const resetPasswordController=require('../Controllers/resetPasswordController');

router.get('/reset-password',resetPasswordController.reset)

module.exports=router;