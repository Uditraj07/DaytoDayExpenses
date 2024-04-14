const User=require('../Model/user')

const bcrypt = require('bcrypt');

const path=require('path');
const { use } = require('../Router/userRouter');
const { error } = require('console');

exports.signup=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','signup.html'));
}

exports.addtoDb=(req,res)=>{
    let data=req.body;
    console.log(data);
    const salt=10;
    let result=bcrypt.hash(data.password,salt).then((hash)=>{
        data.password=hash;
        User.create(data).then((result)=>{
            res.json(result)
        }).catch((error)=>{
            console.log(error)
        })
    }).catch(error=>{
        console.log(error);
    })
    console.log(result)
    
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
            bcrypt.compare(req.query.password,users[0].password).then((result)=>{
                if(result){
                    res.json("User Login successfully");
                }
                else{
                    res.json("Invalid password")
                }
            })
        }
        else{
            res.json("User not found");
        }
    }).catch((error)=>{
        console.log(error)
    })
}