const express = require("express");
// var router = express.Router();
var connection=require('./database');
const hbs = require('hbs');
const path = require('path');
const multer = require('multer');

const bodyParser=require("body-parser");
const res = require("express/lib/response");
const { urlencoded } = require("body-parser");
const encoder=bodyParser.urlencoded();
const app=express();
const favicon = require('serve-favicon');

const { engine } = require ('express-handlebars');

app.engine('handlebars', engine());

app.use(favicon(__dirname + '/img/logoblue.ico'));
app.set('view engine', 'handlebars');
app.use("/views", express.static("views"));

app.use("/assets/images", express.static("images"));
app.use("/assets/js", express.static("js"));
app.use("/assets/fonts", express.static("fonts"));


app.use(express.urlencoded({extended:true}));
app.use(express.json());

const router=require('./src/routes/index');
app.use('/',router);

app.use("/assets", express.static("assets"));
app.use(express.static(path.join(__dirname, "files")));
app.use("/img", express.static("img"));
app.use(express.static("./files"));
// var documentRouter = require("./src/routes/document");
// app.use("/document", documentRouter);





app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
router.get("/report",function(req,res){
    res.sendFile(__dirname +"/report.pdf");
  
})
router.get("/teacheru",function(req,res){
    res.sendFile(__dirname +"/teacheru.pdf");
  
})
router.get("/studentu",function(req,res){
    res.sendFile(__dirname +"/studentu.pdf");
  
})
router.get("/adminu",function(req,res){
    res.sendFile(__dirname +"/adminu.pdf");
  
})
router.get("/",function(req,res){
    res.sendFile(__dirname +"/firstscreen.html");
  
})
app.get("/drop",function(req,res){
    res.sendFile(__dirname +"/dropdown.html");
  
})
app.get("/doc",function(req,res){
    res.render(__dirname +"/doc.html");
  
})
// router.get("/home",function(req,res){
  
//     res.render(__dirname+'/views/home.handlebars');

    
//  })
router.get("/addwork",function(req,res){
  
    res.render(__dirname +"/addwork.handlebars");
    
 })
 app.get("/welcometeacher",function(req,res){
  
    res.render(__dirname +"/views/welcometeacher.handlebars");
    
 })
router.get("/create",function(req,res){
  
   res.render(__dirname +"/views/create.handlebars");
   
})
router.get("/createstudent",function(req,res){
  
    res.render(__dirname +"/views/createstudent.handlebars");
    
 })
 















































function executeQuery(sql,cb){
    connection.query(sql,function(error,result,fields){
        if(error){throw error;}
        cb(result);
    })
}

// function fetchData(response){
//     executeQuery("Select * from users",function(result){
//         console.log(result);
        
//         response.write('<h1> tables</h1><table border="10" style="background-color: white; border-color:#115da8 ;"><tr>');
//         for(var column in result[0]){
//             response.write('<td style="  height: 70px; padding: 15px; width:70px;"><label>'+ column+'</label></td>');
//             res.write('</tr>');
//         }
//         for(var row in result){
//             response.write('<tr>');
//             for(var column in result[row]){
//                 response.write('<td style=""><label>'+ result[row][column]+'</label></td>');

               
//             }
//             response.write('</tr>');
//         }
//         response.end('</tr>');
//     });
// }


// app.get("/createtable",(req,res)=>{
//     let sql="CREATE TABLE loginuser(id int AUTO_INCREMENT,username VARCHAR(255),password VARCHAR(255),PRIMARY KEY(id))";
//     connection.query(sql,(err)=>{
//         if(err){
//             throw err;
//         }
//       console.log("Table Created");
//     });
//   });
//   app.get("/createdb",(req,res)=>{
//     let sql="CREATE DATABASE sinif";
//     connection.query(sql,(err)=>{
//         if(err){
//             throw err;
//         }
//       console.log("Database Created");
//     });
//   });





















app.get("/admin1",function(req,res){
    res.sendFile(__dirname +"/admin1.handlebars");
})

app.get("/adminlogin",function(req,res){
    res.sendFile(__dirname +"/index.html");
})
app.get("/admin",function(req,res){
    res.sendFile(__dirname +"/admin.html");
})
app.get("/quiz",function(req,res){
    res.sendFile(__dirname +"/createquiz.handlebars");
   
})
app.get("/frames",function(req,res){
    res.sendFile(__dirname +"/frames.html");
   
})
app.get("/top",function(req,res){
    res.sendFile(__dirname +"/top.html");
   
})
app.get("/L",function(req,res){
    res.sendFile(__dirname +"/L.html");
   
})
app.get("/R",function(req,res){
    res.sendFile(__dirname +"/R.html");
   
})
app.get("/index",function(req,res){
    res.sendFile(__dirname +"/index.html");
   
})
router.get("/indexStudent",function(req,res){
    res.render(__dirname +"/indexStudent.handlebars");
   
})
router.get("/indexTeacher",function(req,res){
    res.render(__dirname +"/indexTeacher.handlebars");
   
})
app.get("/create",function(req,res){
    res.sendFile(__dirname +"/createclass.html");
   
})
app.get("/class",function(req,res){
    res.sendFile(__dirname+ "/class.html");
})
// app.post("/",encoder,function(req,res){
//     var username=req.body.username;
//     var password=req.body.password;
//     var usern=req.body.usern;
//     var pass=req.body.pass;
//     var email=req.body.email;
   

//     connection.query("select * from loginuser where username=? and password=?",[username,password],function(error,results,fields){
      
//         if(results.length >0){
//             res.redirect("/admin");
//         }else{
        
//              res.redirect("/web");
//         }
//         res.end();
//     })
//     connection.query("INSERT INTO loginuser (username,email,password) VALUES (?, ?,?)",[usern,email,pass],function(error,result,fields){
      
//         res.end();
//     })

// })
app.get("/table",function(req,res){
    fetchData(res);
    console.log("done");
})
app.get("/web",function(req,res){
    res.sendFile(__dirname+ "/webp.html");
})


app.get("/register",function(req,res){
    res.sendFile(__dirname+ "/register.html");
})
router.get("/frames",function(req,res){
    res.sendFile(__dirname+ "/frames.html");
})

app.get("/grade",function(req,res){
    res.sendFile(__dirname+ "/grade.html");
})
app.get("/people",function(req,res){
    res.sendFile(__dirname+ "/people.html");
})
app.get("/createclass",function(req,res){
    res.sendFile(__dirname+ "/createclass.html");
})


app.listen(4000);
module.exports = app;
