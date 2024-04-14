const express=require('express');

const router=express.Router();

const path=require('path');

const userController=require('../Controllers/userController')

router.get('/sign-up',userController.login);

router.post('/create-data',userController.addtoDb);

module.exports=router;