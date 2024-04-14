const User=require('../Model/user')


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