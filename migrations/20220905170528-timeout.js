'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.createTable('timeout', 
      { 
        
        id:{
          type:Sequelize.INTEGER(11),
          allowNull:false,
          primaryKey:true,
          autoIncrement:true
      },
      title:{
          type:Sequelize.STRING,
          allowNull:true,
         unique:false
         
      },
      taskclass:{
          type:Sequelize.STRING,
          allowNull:true,
          unique:false
         
      },
      description:{
          type:Sequelize.STRING,
          allowNull:true,
          unique:true
         
      },
      subject:{
          type:Sequelize.STRING,
          allowNull:true,
          unique:true
         
      },
      file:{
          type:Sequelize.BLOB('long'),
          allowNull:true,
           unique:false
         
      },
      taskdate:{
          type:Sequelize.DATE,
          allowNull:true,
           unique:false
         
      },
      tasktime:{
          type:Sequelize.TIME,
          allowNull:true,
           unique:false
         
      },
      teacher:{
          type:Sequelize.STRING,
          allowNull:true,
          unique:true
         
      }
       }
        
        
        );
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('timeout');
    
  
  }
};
