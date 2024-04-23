const razorpay=require('razorpay');

const jwt=require('jsonwebtoken');

const purchase=require('../Model/order');

const user=require('../Model/user');


exports.purchasePremium=async (req,res)=>{
    try{
        let rzp=new razorpay(
            {
                key_id:"rzp_test_tvnnUAp2yOUBV4",
                key_secret:"puM1fZUVXLpaRvd8g15GyAPF"
            }
        );
        rzp.orders.create({amount:2500,currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err));
            }
            let userId = req.headers['authorization'];
            let jwtUser=jwt.verify(userId,'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMzQ2MTk5NywiaWF0IjoxNzEzNDYxOTk3fQ');
            userId=jwtUser.id;
            purchase.create({orderId:order.id,status:"pending",userId:userId}).then((result)=>{
                res.status(200).json({order,key_id:rzp.key_id});
            }).catch((error)=>{
                console.log(error);
            })
        })
    }
    catch(err){
        console.log(err);
    }
}
exports.updatePremium=(req,res)=>{
    let userId = req.headers['authorization'];
    let jwtUser=jwt.verify(userId,'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMzQ2MTk5NywiaWF0IjoxNzEzNDYxOTk3fQ');
    userId=jwtUser.id;
    let status = req.headers['status'];
    if(status=="success"){
        user.update({isPremium:true},{
            where:{id:userId}
        })
    }
    purchase.findOne({where:{orderId:req.body.orderId}}).then((pur)=>{
        
        pur.update({paymentId:req.body.paymentId,status:status}).then((result)=>{
            res.status(200).json("Payment Successfull");
        })
    })

    console.log(req.body);
}