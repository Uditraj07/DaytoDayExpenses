const Sequelize=require('sequelize');

const sequelize=require('../Util/database')

let order=sequelize.define('order',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      paymentId: {
        type: Sequelize.STRING
      },
      orderId:{
        type: Sequelize.STRING,
      },
      status:{
        type: Sequelize.STRING,
      }
})

module.exports=order;