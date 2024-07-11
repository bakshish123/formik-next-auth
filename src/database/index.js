import mongoose from "mongoose"

export const connectToDB = async()=>{
    await mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=>console.log('db connected'))
    .catch((e)=>console.log(e))

}