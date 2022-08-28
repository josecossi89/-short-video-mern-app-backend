import express from "express";
import mongoose from "mongoose";
import Videos from "./dbModel.js";
import Cors from "cors";
//App Config
const app = express();
const port = process.env.PORT || 9000;
const connection_url =
  "mongodb+srv://josecossib:hokkaido@cluster0.sly9vxz.mongodb.net/shortVideoDB?retryWrites=true&w=majority";
//Middleware
app.use(express.json());
app.use(Cors());
//DB Config
mongoose.connect(connection_url, { useNewUrlParser: true });
//API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("Hello TheWebDev");
});

app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;
  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
//Listeners
app.listen(port, () => {
  console.log(`Listening on localhost: ${port}`);
});
