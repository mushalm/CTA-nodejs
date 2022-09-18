const Sequelize=require('sequelize');
const db=require('../../database');

module.exports=db.define('students',{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    susername:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:false
       
    },
    semail:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:true
       
    },
    spassword:{
        type:Sequelize.STRING,
        allowNull:true,
         unique:false
       
    }
})