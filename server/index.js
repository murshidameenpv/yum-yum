import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import "./src/db/db.js";
import userRoutes from './src/routes/menuRoute.js'

const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//Load all routes
app.use("/", userRoutes);



app.listen(port, () => {
  console.log(`Server Listening on port http://localhost:${port}`);
});  