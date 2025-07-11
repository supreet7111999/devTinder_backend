const validator=require('validator');





const validateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName )
        throw new Error("Name is not valid");
    else if(firstName.length<4 || firstName.lenght>50)
        throw new Error("FirstName length is wrong");
    else if(!validator.isEmail(emailId))
        throw new Error("Email is wrong");
    else if(!validator.isStrongPassword(password))
        throw new Error("password is weak");
}

module.exports={
    validateSignUpData,
}