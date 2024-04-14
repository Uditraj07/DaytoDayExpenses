const express=require('express');

const app=express();

const path=require('path')

const sequelize=require('./Util/database')

const body_parse=require('body-parser');

app.use(body_parse.json());

app.use(express.static(path.join(__dirname, 'public','login.js')));

const userRouter=require('./Router/userRouter')



app.use('/User',userRouter);



sequelize.sync();

app.listen(4000);