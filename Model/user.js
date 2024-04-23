const Sequelize=require('sequelize');

const sequelize=require('../Util/database')

const User=sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false
      },
      isPremium:Sequelize.BOOLEAN,
      totalExpense:{
        type: Sequelize.INTEGER,
        defaultValue:0
      }
})

module.exports=User;