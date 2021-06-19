const express = require("express");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fgaci.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(express.json());
app.use(cors());


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const ordersCollection = client.db("answarIT").collection("orderInfo");
  const contactInfoCollection = client
    .db("answarIT")
    .collection("contactInformation");

  app.post("/addOrder", (req, res) => {
    const order = req.body;
    ordersCollection.insertOne(order).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  // this is for contact page
  app.post("/addContactInfo", (req, res) => {
    const order = req.body;
    contactInfoCollection.insertOne(order).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
});


app.get('/', (req, res) => res.send('Hello World!'))

const port = 5000
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
