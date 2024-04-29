const express=require('express')

const router=express.Router();

const resetPasswordController=require('../Controllers/resetPasswordController');

router.get('/reset-password',resetPasswordController.reset)

router.post('/change-password',resetPasswordController.changePassword);

router.post('/password-changed/:token',resetPasswordController.passwordChanged);
module.exports=router;