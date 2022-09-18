'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.createTable('classes', { 
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
      course:{
          type:Sequelize.STRING,
          allowNull:true,
          unique:false
         
      },
       section:{
          type:Sequelize.STRING,
          allowNull:true,
           unique:false
         
      },
      code:{
          type:Sequelize.STRING,
          allowNull:true,
           unique:true
         
      },
      createdAt:Sequelize.DATE,
        updatedAt:Sequelize.DATE

       });
    
  },

  async down (queryInterface, Sequelize) {
  
      await queryInterface.dropTable('classes');
    
  }
};
