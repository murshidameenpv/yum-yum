import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config()
const port = process.env.PORT || 3001


const app = express()
//middlewares
app.use(cors())
app.use(express.json())

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

     const menuCollection = client.db("yum-yum-db").collection("menus");
      const cartCollection = client.db("yum-yum-db").collection("cartItems");
      
      //All Menu Items
      app.get('/menu', async (req, res) => {
          const result = await menuCollection.find().toArray()
          res.send(result)
      })
    
    
    //All cart operations
    //posting cart item to db
    app.post("/cart", async (req, res) => {
      const cartItem = req.body
      const result = await cartCollection.insertOne(cartItem);
      res.send(result)
    })
    
    
    
    
    
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send(`Hello`)
})



app.listen(port, () => {
    console.log(`Server Listening on port http://localhost:${port}`);
})