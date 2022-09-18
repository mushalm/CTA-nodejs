const User=require('../models/task');
const classs1=require('../models/class');
const student=require('../models/student');
const teacher=require('../models/teacher');
const uploads=require('../models/upload');
const stask=require('../models/stask');
const grade=require('../models/grade');
const join=require('../models/joinclass');
const notifier = require('node-notifier');
var nodemailer = require('nodemailer');

const alert = require("alert");
var multer = require('multer')
const excelJS = require("exceljs");
const exporttask = async (req, res) => {
    const Users=await User.findAll({
        raw:true
    }).catch(error=>console.log(error));
    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("All Tasks"); // New Worksheet
    const path = "./files";  // Path to download excel
    // Column for data in excel. key must match data key
    worksheet.columns = [
      { header: "Id.", key: "s_no", width: 10 }, 
      { header: "Title", key: "title", width: 10 },
      { header: "TaskClass", key: "taskclass", width: 10 },
      { header: "Taskdate", key: "taskdate", width: 10 },
      { header: "Subject", key: "subject", width: 10 },
      { header: "Tasktime", key: "tasktime", width: 10 },
      { header: "Description", key: "description", width: 10 },
      { header: "Teacher", key: "teacher", width: 10 },
      { header: "CreatedAt", key: "createdAt", width: 10 },
      { header: "UpdatedAt", key: "updatedAt", width: 10 },

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
    const data = await workbook.xlsx.writeFile(`${path}/pendingtasks.xlsx`)
     .then(() => {
        notifier.notify({
            title: 'CUI CTA',
            icon: './img/logoblue.png',
            message: 'file successfully downloaded at files'
          });

    //    res.send({
    //      status: "success",
    //      message: "file successfully downloaded",
    //      path: `${path}/pendingtasks.xlsx`,
    //     });
     });
  } catch (err) {
      res.send({
      status: "error",
      message: "Something went wrong",
    });
    }
 };




 const exportgrade = async (req, res) => {

    const {id}=req.params;
    const classs= await classs1.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    const grades=await grade.findAll({
        where:{
            class:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));
    const gradess=await grade.count({
        where:{
            class:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));
    
  if(gradess==0){
    return res.json("NO RESULTS")
  }
else{
    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("All Tasks"); // New Worksheet
    const path = "./files";  // Path to download excel
    // Column for data in excel. key must match data key
    worksheet.columns = [
      { header: "Id.", key: "s_no", width: 10 }, 
      { header: "Title", key: "title", width: 10 },
      { header: "Student", key: "student", width: 10 },
      { header: "Total", key: "total", width: 10 },
      { header: "Obtained", key: "obtained", width: 10 },
    

  ];
  // Looping through User data
  let counter = 1;
  grades.forEach((user) => {
    user.s_no = counter;
    worksheet.addRow(user); // Add data in worksheet
    counter++;
  });
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  try {
    const data = await workbook.xlsx.writeFile(`${path}/grades.xlsx`)
     .then(() => {
        // alert('file successfully downloaded at files')
        notifier.notify({
            title: 'CUI CTA',
            icon: './img/logoblue.png',
            message: 'file successfully downloaded at files'
          });
    //    res.send({
    //      status: "success",
    //      message: "file successfully downloaded",
    //      path: `${path}/pendingtasks.xlsx`,
    //     });
     });
  } catch (err) {
      res.send({
      status: "error",
      message: "Something went wrong",
    });
    }

    res.render('openclass.handlebars',{classs});
}
 };









const createtask=async(req,res)=>{
    const {id}=req.params;
    const classs= await classs1.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    
  res.render('createtask.handlebars',{classs});


}


const savetask=async(req,res)=>{

    const file = req.file;
  
    var info = {
        file: req.file.filename,
        title: req.body.title,
        subject: req.body.subject,
        taskclass: req.body.taskclass,
        teacher:req.body.teach,
        description: req.body.description,
        taskdate: req.body.taskdate,
        tasktime: req.body.tasktime
    };
    created_user = await User.create(info);
    created_users = await stask.create(info);
    notifier.notify({
        title: 'CUI CTA',
        icon: './img/logoblue.png',
        message: 'Task Uploaded'
      });
    
    const classs= await classs1.findAll({
        where:{
            teacher:req.body.teach
        },
        raw:true
    }).catch(error=>console.log(error));
   await  res.render('showclass.handlebars',{classs});
    // return res.send({ message: 'File uploaded successfully.', file });


}

const edittask=async(req,res)=>{
    const {id}=await req.params;
      const task= await User.findOne({
          where:{
              id:id
          },
          raw:true
      }).catch(error=>console.log(error));
      res.render("edittask.handlebars",{task});
  
  }
  
  const updatetask=async(req,res)=>{
      const {id}=req.params;
      const data1=req.body;
      
      const selector1={where:{id:id}}
       await User.update(data1,selector1).catch(error=>console.log(error))
       const classs= await classs1.findAll({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));

    notifier.notify({
        title: 'CUI CTA',
        icon: './img/logoblue.png',
        message: 'Task Updated'
      });
   await  res.render('showclass.handlebars',{classs});    }

    const deletetask=async(req,res)=>{
        const {id}=req.params;
        const user1= await User.findOne({
            where:{
                id:id
            },
            raw:true
        }).catch(error=>console.log(error));
        const user= await User.destroy({
            where:{
                id:id
            },
            raw:true
        }).catch(error=>console.log(error));
        const classs= await classs1.findAll({
            where:{
                teacher:user1.teacher
            },
            raw:true
        }).catch(error=>console.log(error));

        notifier.notify({
            title: 'CUI CTA',
            icon: './img/logoblue.png',
            message: 'Deleted Successfully'
          });
       await  res.render('showclass.handlebars',{classs});
      }
      const grading=async(req,res)=>{
        var info = {
            title: req.body.title,
            class: req.body.class,
            teacher:req.body.teacher,
            student:req.body.sname,
            obtained:req.body.obtained,
            total:req.body.total


        };

var total1=req.body.total;
var obt=req.body.obtained;

        const studentexist=await grade.findOne({
            where:{
               
                student:req.body.sname,
                
            },
          
        }).catch(error=>console.log(error))

        const stud=await student.findOne({
            where:{
               
                susername:req.body.sname,
                
            },
          
        }).catch(error=>console.log(error))
               if (studentexist)
               { return res.json("you already marked this student Assignment")}
               else{
                if(total1>obt){
                    created_user = await grade.create(info);

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
                        to:stud.semail,
                        subject: 'MARKS UPLOADED',
                      
                        html:'Teacher just uploaded your marks. Go check it.'
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                }
               else {
                return res.json("TOTAL MARKS SHOULD BE GREATER THAN OBTAINED MARKS")
               }
              
               }
        

        const upload= await uploads.findAll({
            where:{
                taskclass:req.body.class
            },
            raw:true
        }).catch(error=>console.log(error));

        const grades= await grade.findAll({
            where:{
                student:req.body.sname
            },
            raw:true
        }).catch(error=>console.log(error));
        const classs=await classs1.findOne({
            where:{
               
                classname:req.body.class,
                
            },raw:true
          
        }).catch(error=>console.log(error))
         res.render('showmarks.handlebars',{upload,grades,classs});

      }

      const studentupload=async(req,res)=>{

        const file = req.file;
      
        var info = {
            file: req.file.filename,
            title: req.body.title,
            subject: req.body.subject,
            taskclass: req.body.taskclass,
            teacher:req.body.teacher,
            student:req.body.student,

            description: req.body.description,
            taskdate: req.body.taskdate,
            tasktime: req.body.tasktime
        };
        created_user = await uploads.create(info);
      
        const class2= await join.findOne({
            where:{
                classname:req.body.taskclass
               
            },
            raw:true
        }).catch(error=>console.log(error));
       
       
        const user= await stask.destroy({
            where:{
               
                teacher:req.body.teacher,
                taskclass: req.body.taskclass,
                title: req.body.title
            },
            raw:true
        }).catch(error=>console.log(error));
    
       

  const tasks= await stask.findOne({
    where:{
        taskclass:class2.classname
    },
    raw:true
}).catch(error=>console.log(error));

const notifier = require('node-notifier');
notifier.notify({
    title: 'CUI CTA',
    icon: './img/logoblue.png',
    message: 'Assignment Submitted'
  });



  res.render('viewstudentclass.handlebars',{class2,tasks});

    
    }

    const marksheet=async(req,res)=>{
        const {id}=req.params;
        const classs=await classs1.findOne({
            where:{
               
                id:id,
                
            },raw:true
          
        }).catch(error=>console.log(error))

        const tas= await User.findOne({
            where:{
               
                taskclass:classs.classname,
               
            },
            raw:true
        }).catch(error=>console.log(error));

        const grades= await grade.findAll({
            where:{
               
                class:classs.classname,
               title:tas.title
            },
            raw:true
        }).catch(error=>console.log(error));
         res.render('showmarks.handlebars',{grades,classs});

      }

      const editmarks=async(req,res)=>{
        const {id}=req.params;

        const grades= await grade.findOne({
            where:{
                id:id
            },
            raw:true
        }).catch(error=>console.log(error));
      
        res.render("editshowmark.handlebars",{grades});
    
    }
    
    const updatemarks=async(req,res)=>{
        const {id}=req.params;
        var data1 = {
            title: req.body.title,
            class: req.body.classn,
            teacher:req.body.teacher,
            student:req.body.sname,
            obtained:req.body.obtained,
            total:req.body.total
           
          };
        const selector1={where:{id:id}}
        var total1=req.body.total;
var obt=req.body.obtained;
if(total1>=obt){
    await grade.update(data1,selector1).catch(error=>console.log(error))

}
else{
    return res.json("TOTAL MARKS SHOULD BE GREATER THAN OBTAINED MARKS")
}

    
        const grades= await grade.findAll({
            where:{
                class: req.body.classn,
                
            },raw:true
        }).catch(error=>console.log(error));
        const classs=await classs1.findOne({
            where:{
               
                classname:req.body.classn,
                
            },raw:true
          
        }).catch(error=>console.log(error))
        notifier.notify({
            title: 'CUI CTA',
            icon: './img/logoblue.png',
            message: 'Marks Updated'
          });
         await res.render('showmarks.handlebars',{grades,classs});
      }


      const gradepdf=async(req,res)=>{
        const {id}=req.params;
        const classs= await classs1.findOne({
            where:{
                id:id
            },
            raw:true
        }).catch(error=>console.log(error));
        var client= await grade.findAll({
            where:{
                class:classs.classname
            },
              raw:true
          }).catch(error=>console.log(error));
          var clientt= await grade.count({
            where:{
                class:classs.classname
            },
              raw:true
          }).catch(error=>console.log(error));
if(clientt==0){
    return res.json("NO RESULTS")
}
else{
        const pdfKit = require('pdfkit');
        const fs = require('fs');
        
        let companyLogo = "./img/logoblue.png";
        let fileName = './files/GradeReport.pdf';
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
        
   
        let orderInfo = {
        "orderNo": "GRADE REPORT",
   
        "products": [
        {
        "id": client.id,
        "name":client.student,
        "company":client.titile,
        "class": client.class,
        "obtained": client.obtained,
         "total": client.total,
       
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

        pdfDoc.fontSize(15).text("" + orderInfo.orderNo, 7, 195, {align: "center",width: 250 });
        // pdfDoc.text("Invoice No:" + orderInfo.invoiceNo, 7, 210, { width: 250 });
        // pdfDoc.text("Date:" + orderInfo.invoiceDate + " " + orderInfo.invoiceTime, 7, 225, { width: 250 });
        
        pdfDoc.rect(7, 250, 560, 20).fill("#115da8").stroke("#115da8");
        pdfDoc.fillColor("#fff").text("ID", 20, 256, { width: 90 });
        pdfDoc.text("Student", 70, 256, { width: 100 });
        pdfDoc.text("Title", 170, 256, { width: 220 });
        pdfDoc.text("Class", 300, 256, { width: 100 });
        pdfDoc.text("Obtained", 400, 256, { width: 100 });
        pdfDoc.text("Total", 500, 256, { width: 100 });


        // pdfDoc.text("Created At", 400, 256, { width: 100 });
       
        
        let productNo = 1;
        client.forEach(element => {
        console.log("adding", element.student);
        let y = 256 + (productNo * 20);
        pdfDoc.fillColor("#000").text(element.id, 20, y, { width: 90 });
        pdfDoc.text(element.student, 70, y, { width: 100 });
        pdfDoc.text(element.title, 170, y, { width: 220 });
        pdfDoc.text(element.class, 300, y, { width: 100 });
        pdfDoc.text(element.obtained, 400, y, { width: 100 });
        pdfDoc.text(element.total, 500, y, { width: 100 });

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
            message: 'GradeReport Downloaded!'
          });
          res.render('openclass.handlebars',{classs});
        }
    }
module.exports={
    gradepdf,  exportgrade,  grading, savetask,createtask,updatetask,edittask,exporttask,deletetask,studentupload,marksheet,editmarks,updatemarks
}