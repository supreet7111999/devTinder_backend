const mongoose=require("mongoose");

const connectDB= async ()=>{
    await mongoose.connect(
      "mongodb+srv://supreet7111999:Iuev0dDSmib4Qgz4@devtinder.j9kvpom.mongodb.net/devTinder"
  )
}

module.exports=connectDB