const express=require('express');

const app=express();

app.use("/test",(req,res)=>{
    res.send("Hello bro")
})


app.get("/user",(req,res)=>{
    res.send({"firstName":"Supreet","lastName":"Kumar"})
})

// any thing which matches /* then it will route to below .
app.use("/",(req,res)=>{
    res.send("Base Url");
})

app.listen(7000,()=>{
    console.log("Server listening on 7000")
});