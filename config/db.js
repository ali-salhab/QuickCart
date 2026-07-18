import mongoose from "mongoose";

let cached = global.mongoose;
console.log("cached connection object:", cached);
if (!cached) {
  // here we are creating a global variable to cache the connection object and promise so that we can reuse it across multiple function invocations.
  cached = global.mongoose = { conn: null, promise: null };
}
//  we call this function to connect to the database and return the connection object.
//  If the connection is already established, it will return the cached connection instead of creating a new one.
// AND we call this function in the inngest functions to connect to the database before performing any database operations.
//
async function connectDB() {
  console.log("Connecting to MongoDB...,,,,,,,");
  console.log(cached);
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
      .connect(process.env.MONGO_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
