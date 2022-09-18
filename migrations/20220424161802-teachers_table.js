'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.createTable('teachers',
{     id:{
      type:Sequelize.INTEGER(11),
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
  },
  tusername:{
      type:Sequelize.STRING,
      allowNull:true,
     unique:false
     
  },
  temail:{
      type:Sequelize.STRING,
      allowNull:true,
     unique:true
     
  },
  tpassword:{
      type:Sequelize.STRING,
      allowNull:true,
       unique:false
     
  }, createdAt:Sequelize.DATE,
  updatedAt:Sequelize.DATE
}
      );
   
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.dropTable('teachers');
     
  }
};
