const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://prateek:12345@cluster0.dn8nw.mongodb.net/test_search");

const movieSchema = new mongoose.Schema({
    id: Number,
    name: String,
    review: String
});

const test = new mongoose.Schema({
    description: String
});
const Airbnb = new mongoose.model("listingsAndReviews", test);

const Movies = new mongoose.model("movies", movieSchema);

const movie = new Movies( {
    id: Math.random(),
    name: "how to pass endterm without studying",
    review: "An old Jewish woman and her African-American chauffeur in the American South have a relationship that grows and improves over the years."
});

// movie.save();

app.get("/:question", async (req, res)=> {

    
    const ques = req.params.question;
    
    // Movies.createIndex() is missing

    const agg = await Movies.find({$text: {$search: ques}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}});
    

    res.send(agg);
});

app.listen(process.env.PORT || 9000, ()=>{
    console.log("server is running at port 9000");
});


//db.movies.find({$text: {$search: "driving miss redemption"}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}})
// db.movies.createIndex({"name":"text","review":"text"})


