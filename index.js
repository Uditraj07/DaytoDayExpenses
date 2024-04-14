const express=require('express');

const app=express();

const sequelize=require('./Util/database')

const body_parse=require('body-parser');

app.use(body_parse.json());

const userRouter=require('./Router/userRouter')



app.use('/User',userRouter);



sequelize.sync();

app.listen(4000);