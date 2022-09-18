const Sequelize=require('sequelize');
const db=require('../../database');

module.exports=db.define('file',{
    type:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:false
       
    },
    data:{
        type:Sequelize.BLOB,
        allowNull:true,
        unique:false
       
    }

  
 
})