import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

mongoose
  .connect("mongodb://127.0.0.1:27017/fiter")
  .then(() => {
    console.log("[MongoDB] Connection successfully!");
  })
  .catch((err) => {
    console.log("[MongoDB] Connection failed!\n");
    console.error(err);
  });

const AutoIncrement = AutoIncrementFactory(mongoose);

export { mongoose, AutoIncrement };
