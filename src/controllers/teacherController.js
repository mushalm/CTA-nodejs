const User=require('../models/teacher');
const active=require('../models/activet');
const alert = require("alert");
const notifier = require('node-notifier');

const  pdfMake =require("pdfmake");
const  pdfFonts =require("pdfmake/build/vfs_fonts");
const pdf = require('express-pdf');

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const teacher = require('../models/teacher');

var nodemailer = require('nodemailer');
const excelJS = require("exceljs");

const exportteacher = async (req, res) => {
    const Users=await User.findAll({
        raw:true
    }).catch(error=>console.log(error));
    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("All Teachers"); // New Worksheet
    const path = "./files";  // Path to download excel
    // Column for data in excel. key must match data key
    worksheet.columns = [
      { header: "Id.", key: "s_no", width: 10 }, 
      { header: "Username", key: "tusername", width: 10 },
      { header: "Email", key: "temail", width: 10 },
      { header: "Password", key: "tpassword", width: 10 },
     
  ];
  // Looping through User data
  let counter = 1;
  Users.forEach((user) => {
    user.s_no = counter;
    worksheet.addRow(user); // Add data in worksheet
    counter++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const data = await workbook.xlsx.writeFile(`${path}/allteacher.xlsx`)
     .then(() => {
        
      notifier.notify({
        title: 'CUI CTA',
        icon: './img/logoblue.png',
        message: 'Teacher Report Downloaded!'
      });
    //    res.send({
    //      status: "success",
    //      message: "file successfully downloaded",
    //      path: `${path}/teacher.xlsx`,
    //     });
     });
  } catch (err) {
      
      res.send({
      status: "error",
      message: "Something went wrong file not uploaded",
    });
    }
 };


const allteacher=async(req,res)=>{
  
    const teacher=await User.findAll({
        raw:true
    }).catch(error=>console.log(error))
    await    res.render('teacher.handlebars',{teacher});

}
const teacherForm=async(req,res)=>{
    await res.render("createteacher.handlebars");

}



    
    
  
const saveteacher=async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    var usr = {
      tusername: req.body.tusername,
      temail : req.body.temail,
      tpassword : await bcrypt.hash(req.body.tpassword, salt)
    };
    created_user = await User.create(usr);
    await res.redirect('/teacher');
//     const {tusername,temail,tpassword}=await req.body;
//     const user=await User.create({
//         tusername,temail,tpassword
//     }).catch(error=>console.log(error));
//     console.log(user);
//    await res.redirect('/teacher');
  

}
const signupteacher=async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    var usr = {
      tusername: req.body.tusername,
      temail : req.body.temail,
      tpassword : await bcrypt.hash(req.body.tpassword, salt)
    };
    created_user = await User.create(usr);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'TeamCuicta@gmail.com',
          pass: 'vdvzytobncmkzcxd'
        }, tls: {
            rejectUnauthorized: false
        }
      });
      
      var mailOptions = {
        from: 'TeamCuicta@gmail.com',
        to:req.body.temail,
        subject: 'New User',
      
        html: '<h1>CONGRATULATION!</h1><br><p> WELCOME TO CUI CTA(COMSATS TASK ASSIGNER)<br>CTA is a comsats task assigner website in which we have three console (Admin , teacher , student).<br>Admin have the access of both consoles(Teacher, student ) also able to update anything .<br>Teacher have an access to create class , add work and grade that work. Students are able to join the class , upload their work and post their questions & work.</p>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    await res.redirect('/indexTeacher');
 

}
// const loginteacher=async(req,res)=>{
//     const {username}=await req.params;
//     const {password}=await req.params;

//       const teacher= await User.findOne({
//           where:{
//               username:username,
//              password:password
//             },
//           raw:true
//       }).catch(error=>console.log(error));
//       res.render("/indexTeacher1",{teacher});
  
//   }
  
const editteacher=async(req,res)=>{
  const {id}=await req.params;
    const teacher= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    res.render("editteacher.handlebars",{teacher});

}
const editteacher1=async(req,res)=>{
    const {id}=await req.params;
      const teacher= await User.findOne({
          where:{
              id:id
          },
          raw:true
      }).catch(error=>console.log(error));
      res.render("editteacherself.handlebars",{teacher});
  
  }
  const updateteacher1=async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    const {id}=req.params;
    var data1 = {
        tusername: req.body.tusername,
        temail : req.body.temail,
        tpassword : await bcrypt.hash(req.body.tpassword, salt)
      };
    const selector1={where:{id:id}}
     await User.update(data1,selector1).catch(error=>console.log(error))
     notifier.notify({
      title: 'CUI CTA',
      icon: './img/logoblue.png',
      message: 'Data Updated!'
    });
     await res.redirect('/indexTeacher');
  }
const updateteacher=async(req,res)=>{
    const {id}=req.params;
    const salt = await bcrypt.genSalt(10);
    var data1 = {
        tusername: req.body.tusername,
        temail : req.body.temail,
        tpassword : await bcrypt.hash(req.body.tpassword, salt)
      };
    const selector1={where:{id:id}}
     await User.update(data1,selector1).catch(error=>console.log(error))
     notifier.notify({
      title: 'CUI CTA',
      icon: './img/logoblue.png',
      message: 'Data Updated'
    });
     await res.redirect('/teacher');
  }
  const viewteacher=async(req,res)=>{
    const {id}=req.params;
    const teacher= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    
     res.render('viewteacher.handlebars',{teacher});
  }

  const deleteteacher=async(req,res)=>{
    const {id}=req.params;
    const user= await User.destroy({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
 
     res.redirect('/teacher');
  }
  const loginteacher=async(req,res)=>{
    const user = await User.findOne({ where : {tusername : req.body.tusername }});
    
    if(user){
       const password_valid = await bcrypt.compare(req.body.tpassword,user.tpassword);
       if(password_valid){
      const id=user.id;
      const teacher= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    var usr = {
        tusername: req.body.tusername,
        temail : user.temail,
        tpassword :req.body.tpassword
      };
      created_user = await active.create(usr);
      const activet=await active.findAll({
        raw:true
    }).catch(error=>console.log(error))
     res.render('welcometeacher.handlebars',{teacher,activet});
        //    res.redirect("/welcometeacher");
  
       } else {
         res.status(400).json({ error : "Password Incorrect" });
       }
     
     }else{
       res.status(404).json({ error : "teacher does not exist" });
     }
 
    }
    const sendemail=async(req,res)=>{
       var username=req.body.name;
       var msg=req.body.message;
      
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'TeamCuicta@gmail.com',
              pass: 'vdvzytobncmkzcxd'
            }, tls: {
                rejectUnauthorized: false
            }
          });
          
          var mailOptions = {
            from: 'TeamCuicta@gmail.com',
            to:'TeamCuicta@gmail.com',
            subject: username,
            text:msg
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              notifier.notify({
                title: 'CUI CTA',
                icon: './img/logoblue.png',
                message: 'Email Sent Successfully!'
              });
            }
          });
          res.render('welcometeacher.handlebars');

      }
    const findteacher=async(req,res)=>{
        // logout

       
        const user= await active.destroy({
          where: {},
          truncate: true
      }).catch(error=>console.log(error));
   
         res.redirect('/indexTeacher');
      }
      const genpdf=async(req,res)=>{
        const pdfKit = require('pdfkit');
        const fs = require('fs');
        
        let companyLogo = "./img/logoblue.png";
        let fileName = './files/TeacherReport.pdf';
        let fontNormal = 'Helvetica';
        let fontBold = 'Helvetica-Bold';
        
        let sellerInfo = {
      
        "address": "CUI SAHIWAL CAMPUS",
        "city": "Sahiwal",
        "state": "Punjab",
        "country": "Pakistan",
        "pincode": "57000",
        "contactNo": "+910000000600"
        }
        
      
        var client= await User.findAll({
       
              raw:true
          }).catch(error=>console.log(error));
        let orderInfo = {
        "orderNo": "TEACHERS REPORT",
        // "invoiceNo": "MH-MU-1077",
        // "invoiceDate": "11/05/2021",
        // "invoiceTime": "10:57:00 PM",
        "products": [
        {
        "id": client.id,
        "name":client.tusername,
        "company":client.temail,
        "unitPrice": client.tpassword,
       
        },
      
        ],
        "totalValue": 45997
        }
        
        function createPdf() {
        try {
        
        let pdfDoc = new pdfKit();
        
        let stream = fs.createWriteStream(fileName);
        pdfDoc.pipe(stream);
        var dateTime = new Date();
        // pdfDoc.text("Node.js - PDF Invoice creation using PDFKit library.", 5, 5, { align: "center", width: 600 });
        pdfDoc.image(companyLogo, 25, 20, { width: 60, height: 40 });
        pdfDoc.font(fontBold).text('COMSATS TASK ASSIGNER', 7, 75);
        // pdfDoc.font(fontNormal).fontSize(14).text('Order Invoice/Bill Receipt', 400, 30, { width: 200 });
        pdfDoc.fontSize(10).text("Date:" + dateTime, 400, 46, { width: 200 });
        
        // pdfDoc.font(fontBold).text("Sold by:", 7, 100);
        // pdfDoc.font(fontNormal).text(sellerInfo.companyName, 7, 115, { width: 250 });
        pdfDoc.text(sellerInfo.address, 7, 130, { width: 250 });
        pdfDoc.text(sellerInfo.city + " " + sellerInfo.pincode, 7, 145, { width: 250 });
        pdfDoc.text(sellerInfo.state + ", " + sellerInfo.country, 7, 160, { width: 250 });
        
        // pdfDoc.font(fontBold).text("Customer details:", 400, 100);
        // pdfDoc.font(fontNormal).text(customerInfo.customerName, 400, 115, { width: 250 });
        // pdfDoc.text(customerInfo.address, 400, 130, { width: 250 });
        // pdfDoc.text(customerInfo.city + " " + customerInfo.pincode, 400, 145, { width: 250 });
        // pdfDoc.text(customerInfo.state + " " + customerInfo.country, 400, 160, { width: 250 });
        
        pdfDoc.fontSize(15).text("" + orderInfo.orderNo, 7, 195, {align: "center",width: 250 });
        // pdfDoc.text("Invoice No:" + orderInfo.invoiceNo, 7, 210, { width: 250 });
        // pdfDoc.text("Date:" + orderInfo.invoiceDate + " " + orderInfo.invoiceTime, 7, 225, { width: 250 });
        
        pdfDoc.rect(7, 250, 560, 20).fill("#115da8").stroke("#115da8");
        pdfDoc.fillColor("#fff").text("ID", 20, 256, { width: 90 });
        pdfDoc.text("Name", 110, 256, { width: 100 });
        pdfDoc.text("Email", 300, 256, { width: 220 });
        // pdfDoc.text("Created At", 400, 256, { width: 100 });
       
        
        let productNo = 1;
        client.forEach(element => {
        console.log("adding", element.tusername);
        let y = 256 + (productNo * 20);
        pdfDoc.fillColor("#000").text(element.id, 20, y, { width: 90 });
        pdfDoc.text(element.tusername, 110, y, { width: 100 });
        pdfDoc.text(element.temail, 300, y, { width: 220 });
        // pdfDoc.text(element.createdAt, 400, y, { width: 100 });
        // pdfDoc.text(element.totalPrice, 500, y, { width: 100 });
        productNo++;
        });
        
        pdfDoc.rect(7, 256 + (productNo * 20), 560, 0.2).fillColor("#000").stroke("#000");
        productNo++;
        
        // pdfDoc.font(fontBold).text("Total:", 400, 256 + (productNo * 17));
        // pdfDoc.font(fontBold).text(orderInfo.totalValue, 500, 256 + (productNo * 17));
        pdfDoc.text('Team CTA', 20, pdfDoc.page.height - 50, {
          lineBreak: false
        });
        pdfDoc.end();
        console.log("pdf generate successfully");
        } catch (error) {
        console.log("Error occurred", error);
        }
        }
        
        createPdf();
        notifier.notify({
            title: 'CUI CTA',
            icon: './img/logoblue.png',
            message: 'TeacherReport Downloaded!'
          });
        res.redirect('/teacher');
    }
module.exports={
    sendemail,genpdf,   exportteacher,findteacher, editteacher1,updateteacher1, deleteteacher,allteacher,viewteacher,teacherForm,updateteacher,saveteacher,editteacher,signupteacher,loginteacher
}