const User=require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();
const allUsers=async(req,res)=>{
  
    const users=await User.findAll({
        raw:true
    }).catch(error=>console.log(error))
    await    res.render('home',{users});

}
const userForm=async(req,res)=>{
    await res.render("create.handlebars");

}
const loginuser=async(req,res)=>{
const user = await User.findOne({ where : {username : req.body.username }});
 if(user){
    const password_valid = await bcrypt.compare(req.body.password,user.password);
    if(password_valid){
        // token = jwt.sign({ "id" : user.id,"email" : user.email,"username":user.username},process.env.SECRET);
        // res.status(200).json({ token : token });
        res.redirect("/admin1");

    } else {
      res.status(400).json({ error : "Password Incorrect" });
    }
  
  }else{
    res.status(404).json({ error : "User does not exist" });
  }
}
const saveuser=async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
  var usr = {
    username: req.body.username,
    email : req.body.email,
    password : await bcrypt.hash(req.body.password, salt)
  };
  created_user = await User.create(usr);
//   res.status(201).json(created_user);
   
//     const {username,email,password}=await req.body;
//     const user=await User.create({
//         username,email,password
//     }).catch(error=>console.log(error));
//     console.log(user);
//    await res.redirect('home');
  

}
const signupuser=async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    var usr = {
      username: req.body.username,
      email : req.body.email,
      password : await bcrypt.hash(req.body.password, salt)
    };
    created_user = await User.create(usr);
    // const {username,email,password}=await req.body;
    // const user=await User.create({
    //     username,email,password
    // }).catch(error=>console.log(error));
    // console.log(user);
    // await res.redirect('/');
 

}
const editUser=async(req,res)=>{
  const {id}=await req.params;
    const user= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    res.render("edit.handlebars",{user});

}

const updateUser=async(req,res)=>{
    const {id}=req.params;
    const salt = await bcrypt.genSalt(10);
    var data = {
      username: req.body.username,
      email : req.body.email,
      password : await bcrypt.hash(req.body.password, salt)
    };
    const selector={where:{id:id}}
     await User.update(data,selector).catch(error=>console.log(error))
     await res.redirect('/home');
  }
  const viewUser=async(req,res)=>{
    const {id}=req.params;
    const user= await User.findOne({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
    
     res.render('user',{user});
  }

  const deleteUser=async(req,res)=>{
    const {id}=req.params;
    const user= await User.destroy({
        where:{
            id:id
        },
        raw:true
    }).catch(error=>console.log(error));
 
     res.redirect('/home');
  }
module.exports={
    deleteUser,  viewUser, allUsers,userForm,saveuser,editUser,updateUser,signupuser,loginuser
}