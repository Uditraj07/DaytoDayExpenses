const nodemailer= require('nodemailer');


const sendmail=async (option)=>{
    let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 25,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "0a2ba98df1d52e", // generated ethereal user
          pass: "e4546808c0e1b8", // generated ethereal password
        },
    });

    const emailOptions={
        from:'rohitrajrouth@gmail.com',
        to:option.email,
        subject:option.subject,
        text:option.message
    }

   await transporter.sendMail(emailOptions);
}

module.exports=sendmail;