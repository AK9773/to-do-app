import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.MONGODB_DB_NAME}`
    );
    console.log(
      `MongoDb is connected at host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB failed to connect", error);
    process.exit(1);
  }
};

export default connectDB;
