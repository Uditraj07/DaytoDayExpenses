const express=require('express');

const router=express.Router();

const path=require('path');

const userController=require('../Controllers/userController')

router.get('/sign-up',userController.signup);

router.get('/get-by-email',userController.fetchByEmail);

router.post('/create-data',userController.addtoDb);

router.get('/login',userController.login)

router.get('/user-validation',userController.userValidation)

module.exports=router;
