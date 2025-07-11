const express=require('express');
const connectDB=require("./config/database");
const app=express();
const User=require('./models/User');
const {validateSignUpData}=require('./utils/validation')
const bcrypt=require('bcrypt');



app.use(express.json());

app.post("/signup",async(req,res)=>{
    // const userObj={
    //     firstName:"Supreet",
    //     lastName:"kumar"
    // };
    //Validation
    try{
        validateSignUpData(req);
    //Encrypt the password
    const {firstName,lastName,emailId,password}=req.body;
    
    const passwordHash=await bcrypt.hash(password,10);

    const user=new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash
    });

    await user.save() ;
    res.send("User Created")
    }
    catch(err){
        res.status(400).send("Something went wrong"+err);
    }


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

app.patch("/user",async (req,res)=>{
    const userId=req.body.userId;
    const data=req.body;

    //validations check

    const ALLOWED_UPDATES=[
        "userId",
        "photoUrl",
        "about",
        "gender",
        "age",
        "skilss"
    ];

    const isUpdateAllowed=Object.keys(data).every((key)=>{
        ALLOWED_UPDATES.includes(key)
    });

    if(!isUpdateAllowed){
        res.status(400).send("Update not allowed")
    }
    try{
        const user=await User.findByUdAndUpdate({_id:userId},data);
        res.status(200).send("Success"+user);
    }
    catch(err){
       res.status(400).send("Error "+err);
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
