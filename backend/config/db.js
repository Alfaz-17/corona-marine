import mongoose from "mongoose";


const connectDB = async()=>{

try {
    await mongoose.connect(process.env.DB_URI);
    console.log("MongoDb Connected")
} catch (error) {
    console.error("MongoDb Connection Failed", error);
}

}

export default connectDB;