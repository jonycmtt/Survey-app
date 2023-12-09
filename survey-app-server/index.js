const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
// const jwt = require('jsonwebtoken')
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || "5000";

// middleWare
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jsqvega.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // collection
    const surveyCollection = client.db("surveyDB").collection("survey");
    const userCollection = client.db("surveyDB").collection("users");
    const feedbackCollection = client.db("surveyDB").collection("feedback");
    const votesCollection = client.db("surveyDB").collection("votes");
    const thumbsCollection = client.db("surveyDB").collection("thumbsCount");
    const proUserCollection = client.db("surveyDB").collection("proUser");
    const paymentsCollection = client.db("surveyDB").collection("payments");
    const commentsCollection = client.db("surveyDB").collection("comments");

    // jwt related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    });
    //middleware
    const verifyToken = (req, res, next) => {
      console.log(req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "unauthorized access" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "unauthorized access" });
        }
        req.decoded = decoded;
        next();
      });
    };
    // verifyAdmin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // users related api
    app.post("/users", async (req, res) => {
      const user = req.body;
      // check user duplicate user
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      if (existingUser) {
        return res.send({ message: "user already exits", insertedId: null });
      }

      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    // user get
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      result.sort((a, b) => {
        const statusOrder = ["admin", "surveyor","user"];
        return statusOrder.indexOf(a.role) - statusOrder.indexOf(b.role);
      });
      res.send(result);
    });

    // user admin get
    app.get("/users/admin/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);

      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
    });
    // user Surveyor get
    app.get("/users/surveyor/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);

      let surveyor = false;
      if (user) {
        surveyor = user?.role === "surveyor";
      }
      res.send({ surveyor });
    });
    // user Surveyor get
    app.get("/users/proUser/:email", verifyToken, async (req, res) => {
      const email = req.params.email;

      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const query = { email: email };
      const user = await userCollection.findOne(query);

      let surveyor = false;
      if (user) {
        proUser = user?.role === "proUser";
      }
      res.send({ proUser });
    });

    //   delete user
    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    //   update admin user
    app.patch(
      "/users/admin/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const updatedDoc = {
          $set: {
            role: "admin",
          },
        };
        const result = await userCollection.updateOne(filter, updatedDoc);
        res.send(result);
      }
    );
    //   update survey user
    app.patch("/users/surveyor/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          role: "surveyor",
        },
      };
      console.log(updatedDoc);
      const result = await userCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.patch("/users/proUser/:email", async (req, res) => {
      const id = req.params.email;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          role: "proUser",
        },
      };
      console.log(updatedDoc);
      const result = await userCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // started
    app.get("/survey", async (req, res) => {
      const result = await surveyCollection.find().toArray();
      res.send(result);
    });

    app.get("/survey/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await surveyCollection.findOne(filter);
      res.send(result);
    });

    app.post("/survey", async (req, res) => {
      const surveyItem = req.body;
      const result = await surveyCollection.insertOne(surveyItem);
      res.send(result);
    });

    app.patch("/survey/published/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          role: "published",
        },
      };
      console.log(updatedDoc);
      const result = await surveyCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    app.patch("/survey/UnPublished/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          role: "unPublished",
        },
      };
      console.log(updatedDoc);
      const result = await surveyCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // yes vote patch
    app.patch("/survey/yesVote/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateVote = req.body;
      const updatedDoc = {
        $set: {
          yesVote: updateVote.yesVote,
          voteEmail: updateVote.voteEmail,
          voteName: updateVote.voteName,
        },
      };
      console.log(updatedDoc);
      const result = await surveyCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });
    // no vote patch
    app.patch("/survey/noVote/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateVote = req.body;
      const updatedDoc = {
        $set: {
          noVote: updateVote.noVote,
          voteEmail: updateVote.voteEmail,
          voteName: updateVote.voteName,
        },
      };
      console.log(updatedDoc);
      const result = await surveyCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });
    // updated
    app.patch("/survey/updated/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateSurvey = req.body;
      const updatedDoc = {
        $set: {
          title: updateSurvey.title,
          description: updateSurvey.description,
          category: updateSurvey.category,
          timeFormate: updateSurvey.timeFormate,
          option1: updateSurvey.option1,
          option2: updateSurvey.option2,
        },
      };
      console.log(updatedDoc);
      const result = await surveyCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // feedback
    app.get("/feedback", async (req, res) => {
      const result = await feedbackCollection.find().toArray();
      res.send(result);
    });
    app.post("/feedback", async (req, res) => {
      const feedbackItem = req.body;
      const result = await feedbackCollection.insertOne(feedbackItem);
      res.send(result);
    });

    app.patch("/survey/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateAdminMessage = req.body;
      const updateDoc = {
        $set: {
          adminMessage: updateAdminMessage.adminFeedbackMessage,
          adminEmail: updateAdminMessage.adminEmail,
          adminName: updateAdminMessage.adminName,
        },
      };
      const result = await surveyCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // report user
    app.patch("/survey/reportUser/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateAdminMessage = req.body;
      const updateDoc = {
        $set: {
          userReport: updateAdminMessage.userReport,
          reportUserEmail: updateAdminMessage.reportUserEmail,
          reportUserName: updateAdminMessage.reportUserName,
          userRole: updateAdminMessage.userRole,
        },
      };
      const result = await surveyCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // votes

    app.post("/votes", async (req, res) => {
      const voteData = req.body;
      const result = await votesCollection.insertOne(voteData);
      res.send(result);
    });

    app.get("/votes", async (req, res) => {
      const result = await votesCollection.find().toArray();
      res.send(result);
    });

    // count states
    app.get("/countStates", async (req, res) => {
      const votes = await votesCollection.estimatedDocumentCount();

      res.send(votes);
    });

    // thumbsCount
    app.post("/thumbsCount", async (req, res) => {
      let data = req.body;
      const result = await thumbsCollection.insertOne(data);
      res.send(result);
    });
    app.get("/thumbsCount", async (req, res) => {
      const result = await thumbsCollection.find().toArray();
      res.send(result);
    });

    // prouser
    app.get("/proUser", async (req, res) => {
      const result = await proUserCollection.find().toArray();
      res.send(result);
    });

    app.get("/proUser/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await proUserCollection.find(filter).toArray();
      res.send(result);
    });

    // payment
    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      console.log(amount);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post("/payments", async (req, res) => {
      const payment = req.body;
      const result = await paymentsCollection.insertOne(payment);
      res.send(result);
    });

    app.get("/payments", async (req, res) => {
      const result = await paymentsCollection.find().toArray();
      res.send(result);
    });

    app.patch("/payments/status/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = {
        $set: {
          status: "Pro User",
        },
      };
      console.log(updatedDoc);
      const result = await paymentsCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // comments 
    app.post("/comments", async (req, res) => {
      const payment = req.body;
      const result = await commentsCollection.insertOne(payment);
      res.send(result);
    });

    app.get("/comments", async (req, res) => {
      const result = await commentsCollection.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send({ Message: "Survey Site Server" });
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
