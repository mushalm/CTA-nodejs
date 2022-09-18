'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.createTable('students',{
      id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    susername:{
        type:Sequelize.STRING,
        allowNull:false,
       unique:false
       
    },
    semail:{
        type:Sequelize.STRING,
        allowNull:false,
       unique:true
       
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
       unique:false
       
    } ,
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE
  });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('students');
  
  }
};
