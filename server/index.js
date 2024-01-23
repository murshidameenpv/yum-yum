import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { run } from './src/db/db.js';
dotenv.config()


const app = express()
//middlewares
app.use(cors)
app.use(express.json())

//connection to mongo db
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send(`<h1>Hello</h1>`)
})

const port = process.env.PORT || 3001


app.listen(port, () => {
    console.log(`Server Listening on port http://localhost:${port}`);
})