const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,//this is unnecessacarry in this version
    
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    // .catch((err)=>{
    //     console.log(err)
    // })//i already did unhandled promise rejection
};

module.exports = connectDatabase;