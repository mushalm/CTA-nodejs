'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.createTable('joinclass', {
        
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
        
         });
   
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.dropTable('joinclass');
    
  }
};
