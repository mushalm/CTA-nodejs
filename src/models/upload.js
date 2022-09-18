const Sequelize=require('sequelize');
const db=require('../../database');

module.exports=db.define('uploads',{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:false
       
    },
    taskclass:{
        type:Sequelize.STRING,
        allowNull:true,
        unique:false
       
    },
    description:{
        type:Sequelize.STRING,
        allowNull:true,
        unique:true
       
    },
    subject:{
        type:Sequelize.STRING,
        allowNull:true,
        unique:false
       
    },
    file:{
        type:Sequelize.BLOB('long'),
        allowNull:true,
         unique:false
       
    },
    taskdate:{
        type:Sequelize.DATE,
        allowNull:true,
         unique:false
       
    },
    tasktime:{
        type:Sequelize.TIME,
        allowNull:true,
         unique:false
       
    },
    teacher:{
        type:Sequelize.STRING,
        allowNull:true,
        unique:false
       
    },
    student:{
        type:Sequelize.STRING,
        allowNull:true,
        unique:false
    }
})