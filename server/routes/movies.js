import express from "express";
import {
  getGenres,
  updateGenreOptions,
} from "../controllers/movieController.js";
import Movie from "../models/Movie.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // filter logic
    //  const { ... } = req.query;
    let filter = {};
    let sort = {};

    const movies = await Movie.find().sort();
    res.json(movies);
    console.log(movies[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/moviepicker", async (req, res) => {
  // test if query parameters arrive:  res.json(req.query);
  console.log(typeof req.query.mood);
  console.log(req.query.mood);
  try {
    //  filter movies by streaming (& occasion)
    const movies = await Movie.find({
      "streamingOptions.de": {
        $elemMatch: { "service.id": { $in: req.query.service } },
        //   "occasion": { $in: req.query.occasion}
      }
    }).select({
      title: 1,
      id: 1,
      releaseYear: 1,
      genres: 1,
      mood: 1,
      occasion: 1,
      tags: 1
    });
    // Score the remaining movies

    const filteredMovies = [];
    // console.log(movies);
    for (let movie of movies) {
        movie.score = 0;

        // 100 for each match mood, if “neutral”:  50 for other mood
        if (req.query.mood === "neutral") {
            movie.score += 50;
            if (movie.mood.includes(req.query.mood)) {
                movie.score += 50;
            }
        } else if (movie.mood.includes(req.query.mood)) {
            movie.score += 100;
        }
        console.log("movie mood ", movie.mood, "query mood ", req.query.mood, "score ", movie.score);

        // 150: for match occasion: date, children
        // 100 for match occasion: others
        if (movie.occasion.includes(req.query.occasion)) {
            if (req.query.occasion === "children" || req.query.occasion === "date") {
                movie.score += 150;
            } else {
                movie.score += 100;
            }
        }
        console.log("movie occasion ", movie.occasion, "query occasion ", req.query.occasion, "score ", movie.score);

        // 10 for each genre
        for(let genre of req.query.genre) {
            for(let genreOfMovie of movie.genres) {
                if (genreOfMovie.id === genre) {
                    movie.score += 10;
                }
            }
        }
        console.log("movie genre ", movie.genres, "query genre ", req.query.genre, "score ", movie.score);

        // 50 for each tag
        for(let tag of req.query.tags) {
            if(movie.tags.includes(tag)) {
                movie.score += 50;
            }
        }
        console.log("movie tag ", movie.tags, "query tag ", req.query.tags, "score ", movie.score);
        let releaseYearMin = new Date().getFullYear() - Number(req.query.releaseYear);
        console.log(releaseYearMin);
        if (req.query.releaseYear === "noRestriction") {
            movie.score += 10;
        } else if (movie.releaseYear >= releaseYearMin ) {
            movie.score += 20;
        }
        console.log("movie releaseYear ", movie.releaseYear, "query releaseYear ", req.query.releaseYear, "score ", movie.score);
    
        if(movie.score > 0) {
            filteredMovies.push(movie);
        }
    }

    filteredMovies.sort((a, b) => b.score - a.score);
    


    res.json(filteredMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
