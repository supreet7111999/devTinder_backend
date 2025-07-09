const express=require('express');
const connectDB=require("./config/database");
const app=express();


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
        console.log("Error occured while connecting DB")
    }
)
