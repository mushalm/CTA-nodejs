const Sequelize=require('sequelize');
const db=require('../../database');

// var password = generator.generate({
// 	length: 6,
// 	numbers: true
// });

// 'uEyMTw32v9'
// console.log(password);
module.exports=db.define('joinclass',{
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    classname:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:false
       
    },
    section:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:false
       
    },
    course:{
        type:Sequelize.STRING,
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
       
    },
    semail:{
        type:Sequelize.STRING,
        allowNull:true,
         unique:false
    }
    
})