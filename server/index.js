import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
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
    await client.connect();
    const db = client.db("yum-yum-db");
    const menuCollection = db.collection("menus");
    const cartCollection = db.collection("cartItems");

    //All Menu Items
    app.get('/menu', async (req, res) => {
      try {
        const result = await menuCollection.find().toArray();
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching menu items');
      }
    });

    //All cart operations
    //posting cart item to db
    app.post("/cart", async (req, res) => {
      try {
        const cartItem = req.body;
        console.log(cartItem,"This is cart item");
        const result = await cartCollection.insertOne(cartItem);
        res.status(201).send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error adding item to cart');
      }
    });

    //get items from cart
    app.get("/cart", async (req, res) => {
      try {
       const email = req.query.email;
       const filter = { email: email };
        const result = await cartCollection.find(filter).toArray();
        res.status(201).send(result)
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cart items');
      }
    });


    //get specific cart
    app.get('/cart/:id', async (req, res) => {
      try {
        const id = req.params.id
        //req.params is  string so we need o convert it to object
        const filter = { _id: new ObjectId(id) }
        const result = await cartCollection.findOne(filter)
        res.status(201).send(result)
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching cart')
      }
    })

    //delete items from cart 
    app.delete('/cart/:id', async (req, res) => {
      try {
        const id = req.params.id
        const filter = { _id: new ObjectId(id) }
        const result = await cartCollection.deleteOne(filter)
        res.status(201).send(result)
      } catch (error) {
        console.error(error);
        res.status(500).send('Error removing item from cart')
      }
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send(`Hello`)
});

app.listen(port, () => {
    console.log(`Server Listening on port http://localhost:${port}`);
});

