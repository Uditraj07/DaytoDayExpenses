const User=require('../Model/user')

const path=require('path');
const { use } = require('../Router/userRouter');

exports.signup=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','signup.html'));
}

exports.addtoDb=(req,res)=>{
    let data=req.body;
    console.log(data);
    User.create(data).then((result)=>{
        res.json(result)
    }).catch((error)=>{
        console.log(error)
    })
}

exports.fetchByEmail=(req,res)=>{
    let email=User.findAll({
        where: { email: req.query.email },
      }).then(users => {
        res.json(users);
    }).catch((error)=>{
        res.json("User not found");
    })
}

exports.login=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','login.html'))
}

exports.userValidation=(req,res)=>{
    let email=User.findAll({
        where: { email: req.query.email,
                 }
      }).then(users => {
        if(users.length>0){
            if(users[0].password===req.query.password){
                res.json("User Login successfully")
            }
            else{
                res.json("Invalid password");
            }
        }
        else{
            res.json("User not found");
        }
    }).catch((error)=>{
        console.log(error)
    })
}