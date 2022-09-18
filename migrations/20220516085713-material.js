'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
 
      await queryInterface.createTable('material', {
        
        
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
      data:{
          type:Sequelize.BLOB,
          allowNull:true,
          unique:false
         
      }
      
      });
   
  },

  async down (queryInterface, Sequelize) {
  
      await queryInterface.dropTable('material');
    
  }
};
