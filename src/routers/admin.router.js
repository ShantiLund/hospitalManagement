const express = require('express')
const Admin = require('../models/admin.model')
const User = require('../models/user.model')
const adminAuth = require('../middleware/AdminAuth')

const router = express.Router()

router.post('/admin/signup',async (req,res)=>{
    
    try 
    {  console.log(req.body);
        const admin= new Admin(req.body)
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })


    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/admin/login', async(req, res) => {
    //Login a registered admin
    try {
        const { email, password } = req.body
        const admin = await Admin.findByCredentials(email, password);
        //role=user.role;
        if (!admin) {
            //Console.log("login Failed!");
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await admin.generateAuthToken()
        res.send({admin,token})
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get('/admin/me', adminAuth, async(req, res) => {
    // View logged in admin profile
    res.send(req.admin)
})

router.post('/admin/me/logout', adminAuth, async (req, res) => {
    // Log user out of the application
    try {
        console.log('I am  here')
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.admin.save()
        res.send("log out here")
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/admin/me/logoutall', adminAuth, async(req, res) => {
    // Log user out of all devices
    try {
        req.admin.tokens.splice(0, req.admin.tokens.length)
        await req.admin.save()
        res.send("I am here")
    } catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router
