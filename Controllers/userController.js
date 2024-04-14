const User=require('../Model/user')

const path=require('path');

exports.login=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','login.html'));
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