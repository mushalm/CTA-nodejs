'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.createTable('actives', {
        
        
        
        id:{
          type:Sequelize.INTEGER(11),
          allowNull:false,
          primaryKey:true,
          autoIncrement:true
      },
      susername:{
          type:Sequelize.STRING,
          allowNull:true,
         unique:false
         
      },
      semail:{
          type:Sequelize.STRING,
          allowNull:true,
         unique:true
         
      },
      spassword:{
          type:Sequelize.STRING,
          allowNull:true,
         unique:false
         
      },
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE
      
      }
        
        
        );
    
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.dropTable('actives');
    
  }
};
