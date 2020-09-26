//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true, useUnifiedTopology: true });

const homeStartingContent = "While you don’t always need a reason to write in a journal, it’s good to think about and consider what you hope journaling will help you accomplish. Honestly, journaling isn’t the best solution for every single person. It’s important that your reasons for journaling regularly match your personality, interests, and that it fits into your schedule. A journal is an incredible way to help increase confidence and self-awareness while reducing symptoms of stress and anxiety. ";
const aboutContent = "I am one of the wonderful crazy character who loves to do a lot of things. I write, read, sing, dance and do many art works. I prefer to do a lot of things out of love which holds the first priority. I value time, my thoughts and character. If those are built strongly money comes at the right time as my byproduct. ";
const contactContent = "Contacting me is the most easiest thing as my contact number is the most easy to remember, but me being available to someone or giving time is the most hardest, as you have to really too interesting to get my time spent with you.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const postSchema = {

  title: String,

  content: String

};

const Post = mongoose.model("Post", postSchema);

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {

    res.render("home", {

      startingContent: homeStartingContent,

      posts: posts

    });

  })
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {

  const post = new Post({

    title: req.body.postTitle,

    content: req.body.postBody

  });


  post.save(function (err) {

    if (!err) {

      res.redirect("/");

    }

  });

});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {

    res.render("post", {

      title: post.title,

      content: post.content

    });

  });

});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
