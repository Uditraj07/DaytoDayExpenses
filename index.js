const express=require('express');

const app=express();

const path=require('path')

const sequelize=require('./Util/database')

const body_parse=require('body-parser');

const user=require('./Model/user');

const expense=require('./Model/expenses');

const order=require('./Model/order');

const orderRouter=require('./Router/orders');

app.use(body_parse.json());

app.use(express.static(path.join(__dirname, 'public')));

const userRouter=require('./Router/userRouter')

const expenseRouter=require('./Router/expensesRouter');
const { FORCE } = require('sequelize/lib/index-hints');



app.use('/User',userRouter);

app.use('/Expenses',expenseRouter)

app.use('/Purchase',orderRouter);

app.use('/',(req,res)=>{
    res.send("This is index page")
})


user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(order);
order.belongsTo(user);

sequelize.sync();

app.listen(4000);