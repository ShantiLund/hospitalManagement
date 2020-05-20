const Prescription = require('../models/prescription.model.js');
const multer=require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});
const fileFilter=(req,file,cb)=>{
    //reject the file
    console.log("file filter is calling")
    if(file.mimetype ==='video/.png')
    {
        cb(null,true)
    }
    else{
        console.log("file must be an png file format")
        cb(null,false)
    }
}

const upload=multer(
    {storage:storage,
        limits:
        {
            filesize:1024*1024*5
        },
        fileFilter:fileFilter

    }
    );
// Create and Save a new prescription
exports.create = (req, res) => {
    // Create a prescription
    const prescription = new Prescription({
        prescrption_id: req.body. prescrption_id, 
        email: req.body.email,
        pres_expiry_Date:req.body.pres_expiry_Date
        
    });

    // Save prescription in the database
    prescription.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the prescription."
        });
    });
};

exports.upload = (upload.single('link'), function(req, res) {
    imagePath=req.file.path;
   const finalPath="localhost:3000/"+imagePath+req.params.email;
   
    Prescription.findByIdAndUpdate(req.params.email, {
       
        email: req.param.email,
        path: finalPath
        
    }, {new: true})
    .then(prescription => {
        if(!prescription) {
            const prescription = new Prescription({
               
                email: req.params.email,
                path:finalPath
                
            });
        
            // Save prescription in the database
            prescription.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the prescription."
                });
            });
        }
        res.send(prescription);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "prescription not found with email " + req.params.email
            });                
        }
        return res.status(500).send({
            message: "Error updating prescription with email " + req.params.email
        });
    });


});






