const express=require('express');
const router=express.Router();


const {deleteUser,loginuser,allUsers,viewUser,userForm,updateUser,saveuser,editUser,signupuser}=require('../controllers/userController');
const {deletestudent,homes,genspdf,sendmail,exportstudent,logout1,showstudentclass,addjoinclass,classcode,joinclass,logout,loginstudent,allStudents,viewstudent,studentForm,updatestudent,savestudent,editstudent,viewstudentclass,signupstudent}=require('../controllers/studentController');
const {deleteteacher,sendemail,genpdf,exportteacher,findteacher,editteacher1,updateteacher1,allteacher,viewteacher,teacherForm,loginteacher,updateteacher,saveteacher,editteacher,signupteacher}=require('../controllers/teacherController');
const {showtask,beforeuploaded,openstudentgrade,gencpdf,openuploaded,uploaded1,openstudentmaterial,uploaded,showmaterial,deletematerial,material,uploadmaterial,showteacher,openstudentstudent,openstudentassignment,openstudentpdf,deleteshowclass,openmaterial,openassignment,openstudent,openpdf,exportUser,adminclassnumber,updateshowclass, editshowclass , deleteclass,dropclasses,allclass,openclass,viewclass,classForm1,classForm,showclass,updateclass,saveclass,editclass,saveclass1}=require('../controllers/classController');
const {savetask,gradepdf,exportgrade,updatemarks,grading,editmarks,marksheet,createtask,exporttask,edittask,deletetask,updatetask,studentupload}=require('../controllers/taskController');




router.get("/openstudentgrade/:id",openstudentgrade);
router.get("/gradepdf/:id",gradepdf);
router.get("/gencpdf",gencpdf);
router.get("/sendmail",sendmail);
router.post("/sendmail",sendmail);
router.get("/home",allUsers);
router.get("/create",userForm);
router.post("/create",saveuser);
router.get("/signupuser",userForm);
router.post("/signup",signupuser);
router.get("/edit/:id",editUser);
router.post("/update/:id",updateUser);
router.post("/update/:id",allUsers);
router.get("/user/:id",viewUser);
router.get("/delete/:id",deleteUser);
router.get("/delete/:id",allUsers);
router.get("/signup",allUsers);
router.post("/loginuser",loginuser);
router.get("/admin1",adminclassnumber);
// Student
router.get("/student",allStudents);
router.get("/homes",homes);

router.get("/createstudent",studentForm);
router.post("/createstudent",savestudent);
router.get("/signupstudent",studentForm);
router.post("/signupstudent",signupstudent);
router.get("/editstudent/:id",editstudent);
router.post("/updatestudent/:id",updatestudent);
router.post("/updatestudent/:id",allStudents);
router.get("/viewstudent/:id",viewstudent);
router.get("/deletestudent/:id",deletestudent);
router.get("/deletestudent/:id",allStudents);
router.post("/loginstudent",loginstudent);
router.get("/loginstudent",loginstudent);
router.get("/logouts/:susername",logout);
router.get("/joinclass",joinclass);
router.post("/addjoinclass",addjoinclass);
// router.get("/addjoinclass",showstudentclass);

router.get("/logout1",logout1);


router.post("/classcode",classcode);
router.get("/classcode",classcode);
router.get("/loginstudent",joinclass);





// Teacher
router.get("/teacher",allteacher);

router.get("/createteacher",teacherForm);
router.post("/createteacher",saveteacher);
router.get("/signupteacher",teacherForm);
router.post("/signupteacher",signupteacher);
router.get("/editteacher/:id",editteacher);
router.post("/updateteacher/:id",updateteacher);
router.post("/updateteacher/:id",allteacher);
router.get("/viewteacher/:id",viewteacher);
router.get("/deleteteacher/:id",deleteteacher);
router.get("/deleteteacher/:id",allteacher);
router.post("/loginteacher",loginteacher);
router.get("/loginteacher",loginteacher);
router.get("/logout",findteacher);
router.get("/exportteacher",exportteacher);
router.get("/editteacher1/:id",editteacher1);
router.post("/updateteacher1/:id",updateteacher1);
router.get("/sendemail",sendemail);
router.post("/sendemail",sendemail);
router.get("/genpdf",genpdf);
router.get("/genspdf",genspdf);



router.get("/exportstudent",exportstudent);


// router.get("/welcometeacher",loginteacher);

// class
router.get("/class",allclass);

router.get("/createclass",classForm);
router.post("/createclass",saveclass);
// router.get("/signupteacher",teacherForm);
// router.post("/signupteacher",signupteacher);
router.get("/editclass/:id",editclass);
router.post("/updateclass/:id",updateclass);
router.post("/updateclass/:id",allclass);
router.get("/viewclass/:id",viewclass);
router.get("/deleteclass/:id",deleteclass);
router.get("/deleteclass/:id",allclass);
router.get("/teachercreateclass",classForm1);
router.post("/showclass",saveclass1);
router.get("/showclass/:tusername",showclass);
router.get("/indexTeacher1/:username/:password",loginteacher);
router.get("/openpdf/:id",openpdf);
router.get("/openstudentpdf/:id",openstudentpdf);
router.get("/material/:classname",material);
router.get("/openclass/:id",openclass);
router.get("/openclass/:id",openstudent);
router.get("/openclass/:id",openassignment);
router.get("/openclass/:id",openmaterial);
router.get("/showmaterial/:id",showmaterial);
router.get("/deletematerial/:id",deletematerial);

router.get("/openclass/:id",uploadmaterial);
router.get("/frames",dropclasses);
router.get("/viewstudentclass/:id",viewstudentclass);
router.get("/viewstudentclass/:id",openstudentassignment);
router.get("/openstudentassignment/:id",openstudentassignment);

router.get("/viewstudentclass/:id",openstudentstudent);
router.get("/openstudentstudent/:id",openstudentstudent);
router.get("/openstudentmaterial/:id",openstudentmaterial);
router.get("/viewstudentclass/:id",openstudentmaterial);


router.get("/showstudentclass/:susername",showstudentclass);

//showed class in teacher
router.get("/editshowclass/:id",editshowclass);
router.post("/updateshowclass/:id",updateshowclass);
router.post("/updateshowclass/:id",showclass);
router.get("/deleteshowclass/:id",deleteshowclass);
router.get("/deleteshowclass/:id",showclass);
router.get("/showteacher",showteacher);
router.get("/exportUser",exportUser);
router.get("/openstudent/:id",openstudent);
router.get("/openassignment/:id",openassignment);
router.get("/openmaterial/:id",openmaterial);
router.get("/openuploaded/:id",openuploaded);
router.get("/exportgrade/:id",exportgrade);
router.get("/uploaded/:id",uploaded);
router.get("/uploaded1/:id",uploaded1);
router.get("/beforeuploaded/:id",beforeuploaded);
// task assigning
var path = require('path');
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'files')
     
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${(file.originalname)}`);

    }
  })
   
  var upload = multer({ storage: storage });

 
 
  router.get("/createtask/:id",createtask);
router.post("/taskdata",upload.single('file' ),savetask);
router.post("/grades",grading);
router.get("/marksheet/:id",marksheet);
router.get("/editshowmarks/:id",editmarks);
router.post("/updateshowmarks/:id",updatemarks);

router.get("/taskdata",savetask);
router.get("/showtask",showtask);
router.get("/edittask/:id",edittask);
router.post("/updatetask/:id",updatetask);
router.post("/updatetask/:id",openclass);
router.get("/exporttask",exporttask);
router.get("/deletetask/:id",deletetask);
router.post("/uploadmaterial",upload.single('file'),uploadmaterial);

router.post("/studentupload",upload.single('file' ),studentupload);


// router.get("/uploadmaterial",uploadmaterial);
module.exports=router;