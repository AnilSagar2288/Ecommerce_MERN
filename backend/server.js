const app = require('./app')
const dotenv = require("dotenv")
const connectDB = require("./config/database")
dotenv.config({path:"backend/config/config.env"})

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

PORT = process.env.PORT ||5000

connectDB();

const server = app.listen(PORT, ()=>{
    console.log(`Server is working on http://localhost:${PORT}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });
  