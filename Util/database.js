const Sequelize=require('sequelize');

const sequelize=new Sequelize('expenses_tracker','root','Rohit07',{
    host: 'localhost',
    dialect:'mysql'
  });
module.exports=sequelize;