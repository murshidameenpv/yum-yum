import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import cookieParser from "cookie-parser";
import "./src/db/db.js";
import menuRoute from './src/routes/menuRoute.js'
import cartRoute from './src/routes/cartRoute.js'
import userRoute from './src/routes/userRoute.js'
import authRoute from './src/routes/authRoute.js'
import stripeIntent from './src/routes/stripeIntent.js'


const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


//Load all routes
app.use("/menu", menuRoute);
app.use("/cart", cartRoute);
app.use("/users", userRoute);
//Authorization
app.use("/jwt", authRoute);

//stripe
app.use("/stripe",stripeIntent);



app.listen(port, () => {
  console.log(`Server Listening on port http://localhost:${port}`);
});  