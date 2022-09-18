const User=require('../models/class');
const timeouts=require('../models/timeout');
const teacher=require('../models/teacher');
const student=require('../models/student');
const materials=require('../models/material');
const joinclas=require('../models/joinclass');
const actives=require('../models/actives');
const stask=require('../models/stask');
const uploads=require('../models/upload');
const grade=require('../models/grade');
const task=require('../models/task');
var generator = require('generate-password');
const alert = require("alert");
const active=require('../models/activet');
var fs=require('fs');
var multer = require('multer')

const excelJS = require("exceljs");
const exportUser = async (req, res) => {
    const Users=await User.findAll({
        raw:true
    }).catch(error=>console.log(error));
    const workbook = new excelJS.Workbook();  // Create a new workbook
    const worksheet = workbook.addWorksheet("All Classes"); // New Worksheet
    const path = "./files";  // Path to download excel
    // Column for data in excel. key must match data key
    worksheet.columns = [
      { header: "Id.", key: "s_no", width: 10 }, 
      { header: "Classname", key: "classname", width: 10 },
      { header: "Course", key: "course", width: 10 },
      { header: "Section", key: "section", width: 10 },
      { header: "Teacher", key: "teacher", width: 10 },
      { header: "Code", key: "code", width: 10 },

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
    const data = await workbook.xlsx.writeFile(`${path}/class.xlsx`)
     .then(() => {
        alert('file successfully downloaded at files')

    //    res.send({
    //      status: "success",
    //      message: "file successfully downloaded",
    //      path: `${path}/class.xlsx`,
    //     });
     });
  } catch (err) {
      res.send({
      status: "error",
      message: "Something went wrong",
    });
    }
 };
//  const openstudent=async(req,res)=>{
   
//     res.render('openstudent.handlebars');
  
  
//   }
// document.getElementById("code").value = password;
const adminclassnumber=async(req,res)=>{
    const classs=await User.findAll({
        raw:true
    }).catch(error=>console.log(error))
    const count=await User.count().catch(error=>console.log(error))
    const scount=await student.count().catch(error=>console.log(error))

    const tcount=await teacher.count().catch(error=>console.log(error))
    const tasks=await task.count().catch(error=>console.log(error))
    const join=await joinclas.count().catch(error=>console.log(error))

    await    res.render('admin1.handlebars',{count,tcount,scount,classs,tasks,join});

}

const allclass=async(req,res)=>{
  
    const classs=await User.findAll({
        raw:true
    }).catch(error=>console.log(error))
    await    res.render('class.handlebars',{classs});

}
const dropclasses=async(req,res)=>{
  
    const classs=await User.findAll({
        raw:true
    }).catch(error=>console.log(error))
    await    res.render('frames.handlebars',{classs});

}
const dropteacher=async(req,res)=>{
  
    const teachers=await teacher.findAll({
        raw:true
    }).catch(error=>console.log(error))
    await    res.render('admincreateclass.handlebars',{teachers});

}
const classForm=async(req,res)=>{
    const teachers=await teacher.findAll({
        raw:true
    }).catch(error=>console.log(error))
    await    res.render('createclass.handlebars',{teachers});


}
const classForm1=async(req,res)=>{
    const activet= await active.findAll({
        raw:true
    }).catch(error=>console.log(error));
  
    await res.render("teachercreateclass.handlebars",{activet});

}
const saveclass=async(req,res)=>{
    var password = generator.generate({
        length: 6,
       numbers: true
       });
       var data = {
        classname: req.body.classname,
        course : req.body.course,
        section : req.body.section,
        teacher : req.body.tusername,
        code : password
       
      };
    const user=await User.create(data).catch(error=>console.log(error));
    console.log(user);
   await res.redirect('/class');
  

}

const saveclass1=async(req,res)=>{
    var password = generator.generate({
        length: 6,
       numbers: true
       });
       var data = {
        classname: req.body.classname,
        course : req.body.course,
        teacher : req.body.teach,
        section : req.body.section,
        code : password
       
      };
    const user=await User.create(data).catch(error=>console.log(error));
    console.log(user);

    const classs= await User.findAll({
        where:{
            teacher:req.body.teach
        },
        raw:true
    }).catch(error=>console.log(error));
   
    await res.render('showclass.handlebars',{classs});


}
// const signupstudent=async(req,res)=>{
//     const {classname,course,section,code}=await req.body;
//     const user=await User.create({
//         susername,semail,spassword
//     }).catch(error=>console.log(error));
//     console.log(user);
//     await res.redirect('/frames');
 

// }
const editclass=async(req,res)=>{
    const teachers=await teacher.findAll({
        raw:true
    }).catch(error=>console.log(error))
  

  const {id}=await req.params;
    const classs= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    res.render("editclass.handlebars",{classs,teachers});

}

const updateclass=async(req,res)=>{
    const {id}=req.params;
    var data1 = {
        classname: req.body.classname,
        course : req.body.course,
        section : req.body.section,
        teacher : req.body.tusername,
        code : req.body.code
       
      };
    const selector1={where:{id:id}}
     await User.update(data1,selector1).catch(error=>console.log(error))
     await res.redirect('/class');
  }
  const editshowclass=async(req,res)=>{
    const {id}=await req.params;
      const classs= await User.findOne({
          where:{
              id:id
          },
          raw:true
      }).catch(error=>console.log(error));
      res.render("editshowclass.handlebars",{classs});
  
  }
  
  const updateshowclass=async(req,res)=>{
      const {id}=req.params;
      const data1=req.body;
      const selector1={where:{id:id}}
       await User.update(data1,selector1).catch(error=>console.log(error))
      
       const classs= await User.findAll({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
   await  res.render('showclass.handlebars',{classs});
    }
    const deleteshowclass=async(req,res)=>{
        const {id}=req.params;
        const user= await User.destroy({
            where:{
                id:id
            },
            raw:true
        }).catch(error=>console.log(error));
        const classs= await User.findAll({
            where:{
                id:id
            },
            raw:true
        }).catch(error=>console.log(error));
       await  res.render('showclass.handlebars',{classs});
      }
  const viewclass=async(req,res)=>{
    const {id}=req.params;
    const classs= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    const tasks= await task.findOne({
        where:{
            taskclass:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));

     res.render('viewclass.handlebars',{classs,tasks});
  }
  const showclass=async(req,res)=>{
    const {tusername}=await req.params;
     
    const classs= await User.findAll({
        where:{
            teacher:tusername
        },
        raw:true
    }).catch(error=>console.log(error));

    const activet= await active.findOne({
        where:{
            tusername:tusername
        },
        raw:true
    }).catch(error=>console.log(error));
   
     res.render('showclass.handlebars',{classs,activet});
  }


  const showtask=async(req,res)=>{
     
    const classs= await task.findAll({
     
        raw:true
    }).catch(error=>console.log(error));
  
     res.render('showtask.handlebars',{classs});
  }
  const material=async(req,res)=>{
  
    const {classname}=req.params;
    const classs= await User.findOne({
        where:{
            classname:classname
        },
        raw:true
    }).catch(error=>console.log(error));

    const material1= await materials.findAll({
        
        raw:true
    }).catch(error=>console.log(error));
   res.render("openmaterial.handlebars'",{material1})
}
  const openclass=async(req,res)=>{
    const {id}=req.params;
    const classs= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    const tasks= await task.findOne({
        where:{
            taskclass:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));

        
     
    const pdfFilename = tasks.file;
    const pdfFilepath = `../../htdocs/try/files/${pdfFilename}`;
   
    const src = fs.createReadStream(pdfFilepath);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename=sample.pdf'
    });

    src.pipe(res);

    
  }
  const openstudentpdf=async(req,res)=>{
      
    const {id}=req.params;
    const classs= await joinclas.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    const tasks= await task.findOne({
        where:{
            taskclass:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));

        
     
    const pdfFilename = tasks.file;
    const pdfFilepath = `../../htdocs/try/files/${pdfFilename}`;
   
    const src = fs.createReadStream(pdfFilepath);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename=sample.pdf'
    });

    src.pipe(res);

    
     
  }
  const openpdf=async(req,res)=>{
      
    const {id}=req.params;
    const classs= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    const tasks= await task.findOne({
        where:{
            taskclass:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));
    
        
     
    res.render('openclass.handlebars',{classs,tasks});
     
  }
  const openstudentassignment=async(req,res)=>{
      
    const {id}=req.params;
    const classs= await joinclas.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    const tasks= await stask.findOne({
        where:{

            taskclass:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));

    if(tasks){
        if(tasks.taskdate<=Date.now()){
            const iid=tasks.id;
            const user= await stask.destroy({
                where:{
                    id:iid
                },
                raw:true
            }).catch(error=>console.log(error));
        }
    }
    const student= await actives.findAll({
       
        raw:true
    }).catch(error=>console.log(error));
        
     
    res.render('openstudentassignment.handlebars',{classs,tasks,student});
     
  }
  const openassignment=async(req,res)=>{
      
    const {id}=req.params;
    const classs= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    const tasks= await task.findOne({
        where:{
            taskclass:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));


    //TIMEDOUT CODE
    if(tasks){
    if(tasks.taskdate<=Date.now()){
        console.log('hello thiss assignment timedout')
        const file = tasks.file;
    var info={  
        file: tasks.file,
        title: tasks.title,
        subject: tasks.subject,
        taskclass:tasks.taskclass,
        teacher:tasks.teacher,
        student:tasks.student,

        description: tasks.description,
        taskdate:tasks.taskdate,
        tasktime: tasks.tasktime
    }
    created_user = await timeouts.create(info);

    
    const iid=tasks.id;
    
    const user= await task.destroy({
        where:{
            id:iid
        },
        raw:true
    }).catch(error=>console.log(error));
    }}
   
    const timedout= await timeouts.findAll({
        where:{
            taskclass:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));


    res.render('openassignment.handlebars',{classs,tasks,timedout});
     
  }
  const openstudent=async(req,res)=>{
      
    const {id}=req.params;
    const classs= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    const tasks= await task.findOne({
        where:{
            taskclass:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));
    const joinc= await joinclas.findAll({
        where:{
            classname:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));
    
        
     
    res.render('openstudent.handlebars',{classs,tasks,joinc});
     
  }

  const openstudentstudent=async(req,res)=>{
      
    const {id}=req.params;
    const classs= await joinclas.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    const tasks= await stask.findOne({
        where:{
            taskclass:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));
    const joinc= await joinclas.findAll({
        where:{
            classname:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));
    
    const class2= await joinclas.findOne({
        where:{
            classname:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));
    
        
     
    res.render('openstudentstudent.handlebars',{classs,tasks,joinc,class2});
     
  }
  const openmaterial=async(req,res)=>{
      
    const {id}=req.params;
    const classs= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    const tasks= await task.findOne({
        where:{
            taskclass:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));
    
        const material1= await materials.findAll({
        where:{
            class:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));
     
    res.render('openmaterial.handlebars',{classs,tasks,material1});
   

  }
  const showmaterial=async(req,res)=>{
      
    const {id}=req.params;
    const tasks= await materials.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    
    const pdfFilename = tasks.file;
    const pdfFilepath = `../../htdocs/try/files/${pdfFilename}`;
   
    const src = fs.createReadStream(pdfFilepath);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename=sample.pdf'
    });

    src.pipe(res);
   

  }
  const uploadmaterial=async(req,res)=>{
      
    // const {id}=req.params;
   
    const file= req.file;
       var data = {
        class: req.body.classname,
        file: req.file.filename,
       
      };
      const classn=req.body.classname;
      created_user = await materials.create(data);
      console.log(created_user);
      const material1= await materials.findAll({
        where:{
            class:classn
        },
        raw:true
    }).catch(error=>console.log(error));
    const classs= await User.findOne({
        where:{
            classname:classn
        },
        raw:true
    }).catch(error=>console.log(error));
    
    //   return res.send({ message: 'File uploaded successfully.', file });
    res.render('openmaterial.handlebars',{material1,classs});
     
  }
  const showteacher=async(req,res)=>{
  
    const classteacher=req.body.classteacher;
    console.log(classteacher);
     
  }
  const deleteclass=async(req,res)=>{
    const {id}=req.params;
    const user= await User.destroy({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
 
     res.redirect('/class');
  }
  const deletematerial=async(req,res)=>{
   
    
    const {id}=req.params;
    const mat= await materials.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    
    const user= await materials.destroy({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    const notifier = require('node-notifier');
    notifier.notify({
        title: 'CUI CTA',
        icon: '/try/img/logoblue.png',
        message: 'File Deleted Successfully!!'
      });
      const material1= await materials.findAll({
        where:{
            class:mat.class
        },
        raw:true
    }).catch(error=>console.log(error));
var classs1=mat.class;
const classs= await User.findOne({
    where:{
        classname:classs1
    },
    raw:true
}).catch(error=>console.log(error));

console.log(classs);
   res.render("openmaterial.handlebars",{material1,classs})
    
  }
  const uploaded1=async(req,res)=>{
      
    const {id}=req.params;
    const classs= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
  

    const tas= await task.findOne({
        where:{
            taskclass:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));
    
    const upload= await uploads.findAll({
        where:{
            taskclass:classs.classname,
            title:tas.title
        },
        raw:true
    }).catch(error=>console.log(error));
    
   
    res.render('uploaded.handlebars',{classs,upload});
     
  }

  const uploaded=async(req,res)=>{
      
    const {id}=req.params;
    const tas= await task.findOne({
        where:{
            
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
   

    const upload= await uploads.findAll({
        where:{
            
            title:tas.title
        },
        raw:true
    }).catch(error=>console.log(error));
    const classs= await User.findOne({
        where:{
            
            classname:tas.taskclass
        },
        raw:true
    }).catch(error=>console.log(error));
   
     
    res.render('recieved.handlebars',{upload,classs});
     
  }
  const beforeuploaded=async(req,res)=>{
      
    const {id}=req.params;
    const classs= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    const upload= await task.findAll({
        where:{
            taskclass:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));
    
        
     
    res.render('listoftask.handlebars',{classs,upload});
     
  }



  const openuploaded=async(req,res)=>{
      
    const {id}=req.params;
    const tasks= await uploads.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    
    const pdfFilename = tasks.file;
    const pdfFilepath = `../../htdocs/try/files/${pdfFilename}`;
   
    const src = fs.createReadStream(pdfFilepath);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename=sample.pdf'
    });

    src.pipe(res);
   

  }

  const openstudentmaterial=async(req,res)=>{
      
    const {id}=req.params;
    const classs= await joinclas.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
  
        const material1= await materials.findAll({
        where:{
            class:classs.classname
        },
        raw:true
    }).catch(error=>console.log(error));
     
    res.render('openstudentmaterial.handlebars',{classs,material1});
   

  }

  const openstudentgrade=async(req,res)=>{
      
    const {id}=req.params;
    const classs= await joinclas.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
  
        const grades= await grade.findAll({
        where:{
            class:classs.classname,
            
        },
        raw:true
    }).catch(error=>console.log(error));
     
    res.render('openstudentgrades.handlebars',{classs,grades});
   

  }



  
const gencpdf=async(req,res)=>{
    const pdfKit = require('pdfkit');
    const fs = require('fs');
    
    let companyLogo = "./img/logoblue.png";
    let fileName = './files/ClassReport.pdf';
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
    "orderNo": "CLASSES REPORT",
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
    pdfDoc.text("Classname", 70, 256, { width: 90 });
    pdfDoc.text("Section", 200, 256, { width: 120 });
    pdfDoc.text("Code", 320, 256, { width: 140 });
    pdfDoc.text("Teacher", 400, 256, { width: 100 });

    // pdfDoc.text("Created At", 400, 256, { width: 100 });
   
    
    let productNo = 1;
    client.forEach(element => {
    console.log("adding", element.classname);
    let y = 256 + (productNo * 20);
    pdfDoc.fillColor("#000").text(element.id, 20, y, { width: 90 });
    pdfDoc.text(element.classname, 70, y, { width: 90 });
    pdfDoc.text(element.section, 200, y, { width: 120 });
    pdfDoc.text(element.code, 320, y, { width:140 });
    pdfDoc.text(element.teacher,400, y, { width: 100 });

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
    const notifier = require('node-notifier');
    notifier.notify({
        title: 'CUI CTA',
        icon: './img/logoblue.png',
        message: 'ClassReport Downloaded!'
      });
    res.redirect('/class');
  }
  
  
  
module.exports={
    uploaded, openstudentstudent, openstudentassignment,
     openstudentpdf, showmaterial, material,openstudentmaterial,
      uploadmaterial, showtask,showteacher,openpdf,
      exportUser,openassignment,openmaterial, openstudent,
       adminclassnumber, deleteshowclass,updateshowclass, 
       editshowclass ,dropteacher, deleteclass,allclass,viewclass,
       classForm,updateclass,saveclass,editclass,saveclass1,dropclasses,
       showclass,classForm1,openclass,deletematerial,openuploaded,gencpdf,uploaded1,beforeuploaded,openstudentgrade
}