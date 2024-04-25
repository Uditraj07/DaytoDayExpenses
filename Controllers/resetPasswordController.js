
const path=require('path')

require('dotenv').config()

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "uditrajrout67@gmail.com", // generated ethereal user
      pass: "xxxxxxxxx", // generated ethereal password
    },
  });

exports.reset=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','resetForm.html'));   
}
exports.changePassword=(req,res)=>{

}