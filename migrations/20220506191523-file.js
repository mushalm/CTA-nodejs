'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.createTable('file', { 
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
      
       });
    
  },

  async down (queryInterface, Sequelize) {
    
  
     await queryInterface.dropTable('file');
    
  }
};
