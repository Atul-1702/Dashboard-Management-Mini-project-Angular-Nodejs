import { mongoose } from "mongoose";

export const connection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((connect) => {
      console.log("Connection established");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
