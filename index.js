const express=require('express');

const app=express();

const path=require('path')

const sequelize=require('./Util/database')

const body_parse=require('body-parser');

const user=require('./Model/user');

const expense=require('./Model/expenses');

app.use(body_parse.json());

app.use(express.static(path.join(__dirname, 'public')));

const userRouter=require('./Router/userRouter')

const expenseRouter=require('./Router/expensesRouter');



app.use('/User',userRouter);

app.use('/Expenses',expenseRouter)

app.use('/',(req,res)=>{
    res.send("This is index page")
})


sequelize.sync();

app.listen(4000);