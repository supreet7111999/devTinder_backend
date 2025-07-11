const express=require('express');
const connectDB=require("./config/database");
const app=express();
const User=require('./models/User');

app.use(express.json());

app.post("/signup",async(req,res)=>{
    // const userObj={
    //     firstName:"Supreet",
    //     lastName:"kumar"
    // };

    const user=new User(req.body);

    await user.save() ;
    res.send("User Created")
})


app.get("/user",async (req,res)=>{
    const userEmail=req.bbody.emailId;
    try{
        const users=await User.find({emailId:userEmail});
        if(users.length===0)
            res.status(404).send("user not found");
        else
            res.send(users);
    }
    catch(err)
    {
        res.status(400).send("Something went wrong");
    }

})
app.get("/alluser",async (req,res)=>{
    // const userEmail=req.bbody.emailId;
    try{
        const users=await User.find({});
        if(users.length===0)
            res.status(404).send("user not found");
        else
            res.send(users);
    }
    catch(err)
    {
        res.status(400).send("Something went wrong");
    }

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
