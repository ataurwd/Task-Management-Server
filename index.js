const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = 5000;

const app = express()

app.use(express.json())
app.use(cors())


const uri = "mongodb+srv://ataurrahman24707:tEt88ey8LswveXf1@cluster0.4jm04.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    await client.connect();

    const userCollection = client.db("userDB").collection("newUsers");
    // post all task data collection
    const taskCollection = client.db("taskDB").collection("allTasks");

    app.post('/user', async (req, res) => {
        const user = req.body;
        const result = await userCollection.insertOne(user);
        res.send(result);
    });

    // get user data
    app.get('/users', async (req, res) => {
      const users = await userCollection.find().toArray();
      res.send(users);
    });

    // post task data
    app.post('/tasks', async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });
    // get all tasks
    app.get('/tasks', async (req, res) => {
      const tasks = await taskCollection.find().toArray();
      res.send(tasks);
    });

    // to get tasks by email
    app.get('/tasks/:email', async (req, res) => {
      const email = req.params.email;
      const tasks = await taskCollection.find({ userEmail: email }).toArray();
      res.send(tasks);
    });

    // delete task
    app.delete('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });


    app.get('/', (req, res) => {
    res.send('Welcome to server');
});

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } 
    finally {
  }
}
run().catch(console.log);


app.listen(port, () => {
    console.log(port)
})





// user  Name: ataurrahman24707
//password: tEt88ey8LswveXf1