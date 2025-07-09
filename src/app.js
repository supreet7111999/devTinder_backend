const express=require('express');

const app=express();

app.use("/test",(req,res)=>{
    res.send("Hello bro")
}) 


// Handle Auth Middleware for admin type req.
app.get("/admin",(req,res,next)=>{
    //Authorization Logic
    const adminAuthorize=true;
    if(!adminAuthorize)
    {
        res.status(401).send("Unauthorized req");
    }
    else{
        next();
    }
})

app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data");
})

app.get("/user",(req,res)=>{
    console.log(req.query) // the path will be /user?userId=101&pass=123
    res.send({"firstName":"Supreet","lastName":"Kumar"})
})

app.get("/content/:contentId",(req,res)=>{
    console.log(req.params); // the path is /content/707 
})

// any thing which matches /* then it will route to below .
app.use("/",(req,res)=>{
    res.send("Base Url");
})

app.use("/jhingala",[
    (req,res,next)=>{
        console.log("1st handler");
        next();
    },
    (req,res,next)=>{
        console.log("2nd handler");
        next();
    },
    (req,res)=>{
        res.send("Final");
        next();
    }
])

app.use("/jhingalala",(req,res)=>{
    res.send("Further send");
})


app.use("/",(err,req,res,next)=>{
    if(err)
    {
        res.status(501).send("Something wrong");
    }
})


app.listen(7000,()=>{
    console.log("Server listening on 7000")
});