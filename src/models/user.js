const Sequelize=require('sequelize');
const db=require('../../database');

module.exports=db.define('user',{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:false
       
    },
    email:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:true
       
    },
    password:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:false
       
    }
})