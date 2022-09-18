const Sequelize=require('sequelize');
const db=require('../../database');

module.exports=db.define('activets',{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    tusername:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:false
       
    },
    temail:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:true
       
    },
    tpassword:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:false
       
    }
})