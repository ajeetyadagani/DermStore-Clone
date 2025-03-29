const mongoose =require("mongoose")

require("dotenv").config()

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://ajeet:ajeet360@cluster0.cn7sxue.mongodb.net/dermstore?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connected to MongoDB")
    }catch(err){
        console.log(err)
    }  
}

module.exports={connectDB}

//mongodb://127.0.0.1:27017/Dermstore
//mongodb+srv://<db_username>:<db_password>@cluster0.cn7sxue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0