const Sequelize=require('sequelize');
const db=require('../../database');

module.exports=db.define('material',{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    class:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:false
       
    },
    file:{
        type:Sequelize.BLOB,
        allowNull:true,
        unique:false
       
    }

  
 
})