const Sequelize=require('sequelize');

const sequelize=require('../Util/database')

const Expenses=sequelize.define('expenss',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
       amount:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description:{
        type: Sequelize.STRING,
        allowNull: false
      },
      category:{
        type: Sequelize.STRING,
        allowNull: false
      }
})

module.exports=Expenses;