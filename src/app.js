const express=require('express');

const app=express();

app.use("/test",(req,res)=>{
    res.send("Hello bro")
})

app.use("/",(req,res)=>{
    res.send("Base Url");
})

app.listen(7000,()=>{
    console.log("Server listening on 7000")
});