const express=require('express');

const router=express.Router();

const orderController=require('../Controllers/orderController');

router.get('/purchase-membership',orderController.purchasePremium);

router.post('/update-purchase',orderController.updatePremium);

module.exports=router;