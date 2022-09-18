// const mysql = require('mysql');
// const express = require("express");

// const app=express();
// const conn=mysql.createConnection({
//     host:"localhost",
//     user:"mushal",
//     database:"sinifcta",
//     password:"mushal",
    
// });
// conn.connect((err)=> {
//   if (err) throw err;
//   console.log('Database is connected successfully !');
// });


// module.exports = conn;
const Sequelize=require('sequelize');
const db=new Sequelize('sinifcta','mushal','mushal',{
  host:"localhost",
  dialect:"mysql"
});
module.exports=db;