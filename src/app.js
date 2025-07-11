const express=require('express');
const connectDB=require("./config/database");
const app=express();
const User=require('./models/User');

app.post("/signup",async(req,res)=>{
    const userObj={
        firstName:"Supreet",
        lastName:"kumar"
    };

    const user=new User(userObj)

    await user.save() ;
    res.send("User Created")
})




connectDB()
.then(
    ()=>{
        console.log("Db connected");
        app.listen(7000,()=>{
           console.log("Server listening on 7000")
       }); 
    }
)
.catch(
    (err)=>{
        // console.log(err);
        console.log("Error occured while connecting DB",err)
    }
)
