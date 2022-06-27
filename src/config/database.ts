import mongoose from "mongoose";

let database: mongoose.Connection;
export const connect = () => {
  // add your own uri below
  const uri = "mongodb://127.0.0.1:27017/horserace";
  if (database) {
    return;
  }  
  mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  } as mongoose.ConnectOptions);
  database = mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  database.on("error", () => {
    console.log("Error connecting to database");
  });
};