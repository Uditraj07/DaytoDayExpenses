
const path=require('path')

require('dotenv').config()

const nodemailer = require("nodemailer");

const user=require('../Model/user');

const sendmail=require('../Util/util')


exports.reset=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','resetForm.html'));   
}
exports.changePassword=async (req,res)=>{
    try{
      let result=req.body;
    let userDetails=await user.findOne({
        where:{
            email:result.email,
        }
    })
    if(userDetails){
        let reqUrl=`${req.protocol}::/${req.get('host')}/reset/password-changed`;
        const message=`we have received your password reset. Please use the bellow link to reset your password
        \n\n <a href='${reqUrl}'>click here </a>`;

        await sendmail({
          email:result.email,
          subject:'Password Chnage request recived',
          message:message
        }); 
        res.status(200).json({
          status:'success',
          message:'password reset link send to the user email'
        })
    }
    else{
        res.json("User not found");
    }
    }
    catch(error){
      console.log(error);
    }
}

exports.passwordChanged=async (req,res)=>{
  res.json("this is password changed page");
}