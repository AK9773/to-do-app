import app from "./app.js";
import connectDB from "./db/connect.db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`app is running at ${process.env.PORT}`);
    })
  )
  .catch((error) => {
    console.log("MongoDB connection FAILED!!!", error);
  });
