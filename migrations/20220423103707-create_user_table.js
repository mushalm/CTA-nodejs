'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
     
      await queryInterface.createTable('users', {  
        id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false,
       unique:true
       
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
       unique:true
       
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
       unique:true
       
    } ,
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE
  });
     
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.dropTable('users');
  
  }
};
