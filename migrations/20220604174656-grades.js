'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.createTable('grades', {
       
      id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    student:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:false
       
    },
    teacher:{
        type:Sequelize.STRING,
        allowNull:true,
       unique:false
       
    },
    obtained:{
        type:Sequelize.STRING,
        allowNull:true,
         unique:false
       
    },
    total:{
        type:Sequelize.STRING,
        allowNull:true,
         unique:false
       
    },
    title:{
        type:Sequelize.STRING,
        allowNull:true,
         unique:false
       
    },
    class:{
        type:Sequelize.STRING,
        allowNull:true,
         unique:false
       
    }
    
    });
     
  },

  async down (queryInterface, Sequelize) {
 
      await queryInterface.dropTable('grades');
     
  }
};
