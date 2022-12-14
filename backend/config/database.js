const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
dotenv.config ();

mongoose.set('strictQuery', true);

// const connectDB = async () =>{
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI,{
//             useNewUrlParser: true,
//         });
//         console.log(`MongoDB Conected ${conn.connection.host}`);
//     } catch (error) {
//         console.log(`Error: ${error.message}`);
//         process.exit();
//     }
// }

const connectDB = () => {
  mongoose
    .connect (process.env.MONGO_URI, {useNewUrlParser: true})
    .then (data => {
      console.log (`Mongodb connected with server: ${data.connection.host}`);
    })
};

module.exports = connectDB;
