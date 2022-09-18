const User=require('../models/student');
const bcrypt = require("bcrypt");
const active=require('../models/actives');
const activet=require('../models/activet');

const classs=require('../models/class');
const join=require('../models/joinclass');
const stask=require('../models/stask');
var nodemailer = require('nodemailer');
const excelJS = require("exceljs");
const notifier = require('node-notifier');
const exportstudent = async (req, res) => {
  const Users=await User.findAll({
      raw:true
  }).catch(error=>console.log(error));
  const workbook = new excelJS.Workbook();  // Create a new workbook
  const worksheet = workbook.addWorksheet("All Teachers"); // New Worksheet
  const path = "./files";  // Path to download excel
  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: "Id.", key: "s_no", width: 10 }, 
    { header: "Username", key: "susername", width: 10 },
    { header: "Email", key: "semail", width: 10 },
    { header: "Password", key: "spassword", width: 10 },
   
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
  const data = await workbook.xlsx.writeFile(`${path}/allstudent.xlsx`)
   .then(() => {
      
    
    notifier.notify({
        title: 'CUI CTA',
        icon: '/try/img/logoblue.png',
        message: 'File Downloaded Successfully!!'
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

const genspdf=async(req,res)=>{
  const pdfKit = require('pdfkit');
  const fs = require('fs');
  
  let companyLogo = "./img/logoblue.png";
  let fileName = './files/StudentReport.pdf';
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
  "orderNo": "STUDENTS REPORT",
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
  console.log("adding", element.susername);
  let y = 256 + (productNo * 20);
  pdfDoc.fillColor("#000").text(element.id, 20, y, { width: 90 });
  pdfDoc.text(element.susername, 110, y, { width: 100 });
  pdfDoc.text(element.semail, 300, y, { width: 220 });
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
      message: 'StudentReport Downloaded!'
    });
  res.redirect('/student');
}




const showstudentclass=async(req,res)=>{
  const{susername}= await req.params;
 
  const class1= await join.findAll({
    where:{
      student:susername
     },
      raw:true
  }).catch(error=>console.log(error));
  // const class2= await classs.findAll({
  //   where:{
  //    classname:class1.classname
  //   },
  //     raw:true
  // }).catch(error=>console.log(error));
  const class2= await join.findOne({
    where:{
        student:susername
    },
    raw:true
}).catch(error=>console.log(error));

   res.render('showstudentclass.handlebars',{class1,class2});
}

const viewstudentclass=async(req,res)=>{
  const {id}=req.params;
  const class2= await join.findOne({
      where:{
          id:id
      },
      raw:true
  }).catch(error=>console.log(error));
 
  const tasks= await stask.findOne({
    where:{
        taskclass:class2.classname
    },
    raw:true
}).catch(error=>console.log(error));

  res.render('viewstudentclass.handlebars',{class2,tasks});


}


const allStudents=async(req,res)=>{
  
    const student=await User.findAll({
        raw:true
    }).catch(error=>console.log(error))
    await    res.render('student.handlebars',{student});

}
const studentForm=async(req,res)=>{
    await res.render("createstudent.handlebars");

}
const savestudent=async(req,res)=>{
  const salt = await bcrypt.genSalt(10);
  var usr = {
    susername: req.body.susername,
    semail : req.body.semail,
    spassword : await bcrypt.hash(req.body.spassword, salt)
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
      to:req.body.semail,
      subject: 'New Student',
    
      html: '<h1>CONGRATULATION Student!</h1><br><p> WELCOME TO CUI CTA(COMSATS TASK ASSIGNER)<br>CTA is a comsats task assigner website in which we have three console (Admin , teacher , student).<br>Admin have the access of both consoles(Teacher, student ) also able to update anything .<br>Teacher have an access to create class , add work and grade that work. Students are able to join the class , upload their work and post their questions & work.</p>'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  await res.redirect('/student');

}
const signupstudent=async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    var usr = {
      susername: req.body.susername,
      semail : req.body.semail,
      spassword : await bcrypt.hash(req.body.spassword, salt)
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
        to:req.body.semail,
        subject: 'New Student',
      
        html: '<h1>CONGRATULATION Student!</h1><br><p> WELCOME TO CUI CTA(COMSATS TASK ASSIGNER)<br>CTA is a comsats task assigner website in which we have three console (Admin , teacher , student).<br>Admin have the access of both consoles(Teacher, student ) also able to update anything .<br>Teacher have an access to create class , add work and grade that work. Students are able to join the class , upload their work and post their questions & work.</p>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    await res.redirect('/indexStudent');
 

}
const sendmail=async(req,res)=>{
 
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
      from:'TeamCuicta@gmail.com',
      to:'TeamCuicta@gmail.com',
      subject: req.body.uname,
       text:req.body.message
      
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  await res.redirect('/');


}

const loginstudent=async(req,res)=>{
    const user = await User.findOne({ where : {susername : req.body.susername }});
    
    if(user){
       const password_valid = await bcrypt.compare(req.body.spassword,user.spassword);
       if(password_valid){
      const id=user.id;
      const student= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    var usr = {
        susername: req.body.susername,
        semail : user.semail,
        spassword :req.body.spassword
      };

      // created_user = await active.create(usr);
        var suser=req.body.susername;
        var email=user.semail;
        var password=req.body.spassword;



      const actives=await active.findAll({
        raw:true
    }).catch(error=>console.log(error))
     res.render('welcomestudent.handlebars',{student,suser,email,password,actives});
        //    res.redirect("/welcometeacher");
        notifier.notify({
          title: 'CUI CTA',
          icon: '/try/img/logoblue.png',
          message: 'Welcome'
        });
  
       } else {
         res.status(400).json({ error : "Password Incorrect" });
       }
     
     }else{
       res.status(404).json({ error : "Student does not exist" });
     }

    }
    const logout1=async(req,res)=>{
        // logout
      
        const user= await active.destroy({
            where: {},
            truncate: true
        }).catch(error=>console.log(error));
     
         res.redirect('/indexStudent');
      }
    const logout=async(req,res)=>{
        // logout
      //   const user= await activet.destroy({
      //     where: {},
      //     truncate: true
      // }).catch(error=>console.log(error));
     
         res.redirect('/indexStudent');
      }
const editstudent=async(req,res)=>{
  const {id}=await req.params;
    const student= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    res.render("editstudent.handlebars",{student});

}
const joinclass=async(req,res)=>{
    const active1=await active.findAll({
        raw:true
    }).catch(error=>console.log(error))
    
  
      res.render("joinclass.handlebars",{active1});
  
  }
  const classcode=async(req,res)=>{
      const code1=req.body.clascode;
    const class1=await classs.findOne({
        where:{
            code:code1
        },
        raw:true
    }).catch(error=>console.log(error))
    if(class1){

    
    const active1=await active.findAll({
        raw:true
    }).catch(error=>console.log(error))
    
      res.render("joinclass.handlebars",{class1,active1});
    }else{
      return res.json("INVALID CLASSCODE")
    }
  }
const addjoinclass=async(req,res)=>{
      const classnam=req.body.sclassname;
      const susername=req.body.username;
      
    //   const semail=req.body.email;

      var usr = {
        classname: req.body.sclassname,
        section: req.body.ssection,
        course: req.body.scourse,
        teacher: req.body.steacher,

        student : req.body.username,
        semail :req.body.email
      };
      const studentexist=await join.findOne({
        where:{
            classname:classnam,
            student:susername,
            semail:req.body.email
        },
      
    }).catch(error=>console.log(error))
           if (studentexist)
           { return res.json("you already joined this class")
          
          
          }
           else{
      created_user = await join.create(usr);
      notifier.notify({
        title: 'CUI CTA',
        icon: '/try/img/logoblue.png',
        message: 'Class Joined'
      });
           }

           const class1= await join.findAll({
             where:{
               student:susername
              },
               raw:true
           }).catch(error=>console.log(error));

           res.render('showstudentclass.handlebars',{class1});
  
  }
const updatestudent=async(req,res)=>{
    const {id}=req.params;
    const data1=req.body;
    const selector1={where:{id:id}}
     await User.update(data1,selector1).catch(error=>console.log(error))
     return res.json("Data Updated Successfully! Close this page.")
  }
  const viewstudent=async(req,res)=>{
    const {id}=req.params;
    const student= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    
     res.render('viewstudent.handlebars',{student});
  }

  const deletestudent=async(req,res)=>{
    const {id}=req.params;
    const user= await User.destroy({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    notifier.notify({
      title: 'CUI CTA',
      icon: '/try/img/logoblue.png',
      message: ' Deleted Successfully!!'
    });
     res.redirect('/student');
  }
  const homes=async(req,res)=>{
    const actives=await active.findAll({
      raw:true
  }).catch(error=>console.log(error))


  const s=await User.findOne({
    where:{
      susername:actives.susername
  },
    raw:true
}).catch(error=>console.log(error))
   res.render('welcomestudent.handlebars',{s});
  }
module.exports={
  genspdf,sendmail,homes,viewstudentclass,exportstudent, logout1
  , joinclass,addjoinclass,showstudentclass,  
  classcode, logout, loginstudent,deletestudent,allStudents,viewstudent,studentForm,updatestudent,savestudent,editstudent,signupstudent
}