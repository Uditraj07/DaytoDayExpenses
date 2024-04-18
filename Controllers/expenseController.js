const Expenses=require('../Model/expenses')

const jwt=require('jsonwebtoken');

const path=require('path');

exports.expenses=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Views','expense.html'));
}

exports.addExpenses=(req,res)=>{
    Expenses.create(req.body).then((result)=>{
        res.json(result)
    })
}
exports.getAllExpenses=(req,res)=>{
  let userId=req.query.id;
  let user=jwt.verify(userId,'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMzQ2MTk5NywiaWF0IjoxNzEzNDYxOTk3fQ')
  console.log(user)  
  Expenses.findAll({
      where: { userId: user.id
               }
    }).then(expenses => {
        res.json(expenses);
  })
}

exports.delete=(req,res)=>{
    let id=req.params.id;
    Expenses.destroy({
          where: {
            id: id
          }
        })
        .then(numDeleted => {
          if (numDeleted === 1) {
            res.json('Record deleted successfully.');
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