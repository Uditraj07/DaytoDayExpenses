const Expenses=require('../Model/expenses')

const User=require('../Model/user')

const jwt=require('jsonwebtoken');

const sequelize=require('sequelize')

const Sequelize=require('../Util/database');

const path=require('path');


exports.expenses=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','expense.html'));
}

exports.addExpenses= async(req,res)=>{
  const t = await Sequelize.transaction();
  let user=jwt.verify(req.body.userId,'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMzQ2MTk5NywiaWF0IjoxNzEzNDYxOTk3fQ')
  req.body.userId=user.id;
  User.findByPk(user.id,{ transaction: t })
  .then((result) => {
    let totalExpenses = Number(result.dataValues.totalExpense) + Number(req.body.amount);
    User.update({ totalExpense: totalExpenses }, { where: { id: user.id } })
      .then((results) => {
        console.log(results);
        Expenses.create(req.body).then(async (result)=>{
          await t.commit();
          res.json(result)
      }).catch(async (error)=>{await t.rollback();})
      }).catch(async (error)=>{
        await t.rollback();
      })
  }).catch(async (error)=>{
      await t.rollback();
  })
    
}
exports.getAllExpenses=(req,res)=>{
  let userId=req.query.id;
  let user=jwt.verify(userId,'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMzQ2MTk5NywiaWF0IjoxNzEzNDYxOTk3fQ')
  Expenses.findAll({
      where: { userId: user.id
               }
    }).then(expenses => {
        for(let expense of expenses){
          expense.userId=jwt.sign({id:user.id},'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMzQ2MTk5NywiaWF0IjoxNzEzNDYxOTk3fQ')
        }
        res.json(expenses);
  })
}

exports.delete=async (req,res)=>{
    let id=req.params.id;
    let response=await Expenses.findByPk(id);
    let amount=response.dataValues.amount;
    let userId = req.headers['authorization'];
    let user_id=jwt.verify(userId,'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMzQ2MTk5NywiaWF0IjoxNzEzNDYxOTk3fQ')
    response= await User.findByPk(user_id.id);
    let totalAmount=Number(response.dataValues.totalExpense)-Number(amount);
    console.log(totalAmount);
    Expenses.destroy({
          where: {
            id: id
          }
        })
        .then(numDeleted => {
          if (numDeleted === 1) {
            res.json('Record deleted successfully.');
            User.update({totalExpense:totalAmount},{
              where: {
                id: user_id.id
              }
            })
          } else {
            res.json('Record not found or not deleted.');
          }
        })
        .catch(err => {
          console.error('Error deleting record:', err);
        });
}
exports.update=(req,res)=>{
    Expenses.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(numUpdated =>{
        res.json(Expenses.findByPk(req.params.id))
    })
    .catch(err => {
      console.error('Error updating record:', err);
    });
  }
exports.getallexpenses= async (req,res)=>{
  // Query to get the total sum of expenses for each user
      let response=await User.findAll({
        attributes: ['name', 'totalExpense'], 
        order: [['totalExpense', 'DESC']] 
      });
        console.log(response);
        let array=[];
        for(let i of response){
          array.push(i.dataValues);
        }
        res.json(array);

}