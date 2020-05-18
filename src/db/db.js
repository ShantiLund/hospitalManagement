const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
   
    useNewUrlParser: true,
    useCreateIndex: true,
   
}).catch((err)=>{
    console.log("Error connecting to database");
    console.log(err);
})

mongoose.connection.once("open",function () {
    console.log("db connected")
    
}).catch((err)=>{
    console.log("Error connecting to database");
    console.log(err);
})