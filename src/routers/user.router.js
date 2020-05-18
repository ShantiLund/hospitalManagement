const express = require('express')
const User = require('../models/user.model')
const auth = require('../middleware/auth')
const adminAuth=require('../middleware/AdminAuth')
// var nodemailer = require('nodemailer');
// var hbs=require('nodemailer-express-handlebars');
// const bcrypt = require('bcryptjs')

// const xoauth2 =require('xoauth2');

const router = express.Router()

router.get('/', async(req, res)=>{
    res.status(201).send("Server running");
});
router.post('/users/signup', async (req, res) => {    
    try{ console.log(req.body);  
        const user=new User(req.body);
                await user.save()
               
                //console.log("user is here"+user);
                const token = await user.generateAuthToken();
                //console.log("token is "+token);
               
               
               res.status(200).send(user);
                
            } catch (error) {
                console.log(error)
                res.status(400).send(error)
            }
        
        });
router.post('/admin/getAll', adminAuth,async (req, res) => {
  // res.send(req.body.role)
  // console.log('here');
   User.find({role:req.body.role})
    
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error while retreiving users."
        });
    });
});

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
       // console.log("I am here")
       // console.log(req.body);
        const { email, password } = req.body
        console.log(req.body);
        const user = await User.findByCredentials(email, password);
        //console.log("User is "+user)
        role=user.role;
        
        if (!user) {
            //console.log("Here");
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
       // console.log("token is "+token)
        res.send({role,token})
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

router.get('/users/me', auth,  async(req, res) => {
    // View logged in user profile
    //console.log(req.user);
    res.send(req.user)
})

router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
           // res.send(req.user.tokens)
            return token.token != req.token

        })
        await req.user.save()
        res.send("Logout user")
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        //console.log("I am here")
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send(req.user.tokens.length)
    } catch (error) {
        res.status(500).send(error)
    }
});

// router.post('/user/forgotPassword', async(req,res)=>{
//     try{
       
//         const email=req.body.email;
//         console.log(req.body.email);
//         var path='http://localhost:3000/user/activateNewPassword';
//       const  pass = await bcrypt.hash(req.body.newPassword,8)
//        // console.log(pass);
//        User.findOneAndUpdate({email:req.body.email}, {
//             newPassword:pass
//         }, {new: true})
//         .then(user => {
//             if(!user) {
//                 return res.status(404).send({
//                     message: "Not Varfied user.  " + req.body.email
//                 });
//             }
//            sendVarificationEmail(email,path)
//            res.send({message: 'Verification email has been sent you account!! Kindly verify it'})
            
            
//         }).catch(err => {
//             if(err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "Not Varified User " + req.params.email
//                 });                
//             }
//             return res.status(500).send({
//                 message: "Error updating Verified variable " });
//         });

//     }
//     catch(error)
//     {
//         console.log(error);

//     }
   

// });

// router.post('/user/changePassword/:email',async(req,res)=>{
//     try{

       
//             const email=req.params.email;
//             const password=req.body.password;
//            const newPass = await bcrypt.hash(req.body.newPassword, 8)
//             const user = await User.findByCredentials(email, password);
//         if(user)
//         {
//             user.password=req.body.newPassword;
           

//         }
//         await user.save();
//        res.send(user);
    

        

//        }
//     catch(error)
//     {
//         console.log(error);
//     }

// });
// router.get('/user/varification/:email',async(req, res) =>{
    
//     try{
//        // console.log("recieve email"+req.params.email);
//         User.findOneAndUpdate({email:req.params.email}, {
//             name: "Hello",
//             varified: true
//         }, {new: true})
//         .then(user => {
//             if(!user) {
//                 return res.status(404).send({
//                     message: "Not Varfied user.  " + req.params.email
//                 });
//             }
//             res.send(user)
            
//         }).catch(err => {
//             if(err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "Not Varified User " + req.params.email
//                 });                
//             }
//             return res.status(500).send({
//                 message: "Error updating Verified variable " });
//         });
       
//     }
//     catch(error)
//     {
//         console.log(error);

//     }
  
    
  
// });

// router.get('/user/activateNewPassword/:email', async (req, res) =>{
//     //console.log("Activation here Email recieved is"+ req.params.email);
    
//    try{
//     var newPass="";
//   await User.find({email:req.params.email})
//     .then(user => {
//         if(!user) {
//             return res.status(404).send({
//                 message: "User not found with email " + req.params.email
//             });            
//         }
//        newPass=user[0]["newPassword"];
//        console.log("new Password is "+newPass);
//           });

//           User.findOneAndUpdate({email:req.params.email}, {
//             password: newPass,
//         }, {new: true})
//         .then(user => {
//             if(!user) {
//                 return res.status(404).send({
//                     message: "Not Varfied user.  " + req.params.email
//                 });
//             }
//             res.send(user)
        
//         });


   
//      } catch(error){
//        console.log(error);
//    }

// });
// function sendVarificationEmail(email,path)
// {    //console.log("Email is "+email);
//      //console.log("Path is"+path);
//     try{

//         //var user_email_address=email;
//         //console.log('user email is'+email);
        
//          const address=`${path}/${email}`;
//         //console.log(address);
//          var transporter=nodemailer.createTransport({
//         service:'gmail',
//         host: "smtp.gmail.com",
  
    
//         auth:{
            
//                 type: "OAuth2",
//                 user:'shanti.cs15@iba-suk.edu.pk',
//                 clientId:'462013622902-t8g5jm0kljreudaghm6efohnk62p9mkq.apps.googleusercontent.com',
//                 clientSecret:'LgRxv5c29xJRra1x25Sq5olG',
//                 refreshToken:'1//04B-Kmaq7MkKzCgYIARAAGAQSNwF-L9IrFCpJDBbCjPT1uzKFv28vojJK-QYE8Zf3YVq6yOy6VnIRh0_JdrmGz3xVh4PElRIfcks'
            
           
//         }
       
//     });

//     const handlebarOptions = {
//         viewEngine: {
//           extName: '.hbs',
//           partialsDir: 'src/views',
//           layoutsDir: 'src/views',
//           defaultLayout: 'index.hbs',
//         },
//         viewPath: 'src/views',
//         extName: '.hbs',
//       };
      
//       transporter.use('compile', hbs(handlebarOptions));
//     var mailOptions={
//         from: 'Shanti <shanti.cs15@iba-suk.edu.pk>',
//         to:  email,
//         subject: 'Sending Email using Node js',
//         template:' ',
//         context:{
//             url:`${address}`
            
//         }
//         //html: `<a href="${url}">http://localhost:3000/user/varification/</a>`
        
//     };
//     transporter.sendMail(mailOptions,function(error,info){
//         if(error)
//         {
//             console.log(error);
//         }
//         else
//         {
//             console.log('Email Sent'+info.response)
//         }
//     })


//       }catch(error)
//     {
//             res.send(error)
//     }
    
// }

module.exports = router