import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    /*So, this code works in JavaScript, but not in Typescript:
    
    + mongoose.connect(process.env.MONGO_URI)
    
    instead this works:
    - mongoose.connect(`${process.env.MONGO_URI}`)
     */
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`)
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    // @ts-ignore
    console.error(`Error: ${error.message}`.bgRed.bold)
    process.exit(1)
  }
}
export default connectDB
