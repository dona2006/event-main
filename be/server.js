const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//database setup
mongoose.connect(
  "mongodb+srv://anushkasingh09:kGtxW623RtVAD9KP@cluster0.qjuweye.mongodb.net/hotel-booking-database",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const commentSchema = new mongoose.Schema({
  username: String,
  text: String,
});

const Comment = mongoose.model("Comment", commentSchema);

//API to get all the existing comments saved in our database
app.get("/comments", async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

//API to post comment and save it to our database
app.post("/comments", async (req, res) => {
  const { username, text } = req.body;
  const newComment = new Comment({ username, text });
  await newComment.save();
  res.json({ message: "Comment added successfully" });
});

const port = 5000;
app.listen(port, () => console.log("server has been started!"));
