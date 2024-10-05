import mongoose from "mongoose";
import express from "express";
import {
  getGenres,
  updateGenreOptions,
} from "../controllers/movieController.js";
import Movie from "../models/Movie.js";

const router = express.Router();

// get all movies and filter
router.get("/", async (req, res) => {
  try {
    // filter logic
    console.log("parameters:", req.query);
    const { mood, genre, occasion, releaseYear, service, tags } = req.query;
    // Build filter object
    let filter = {};
    // TBD: implement switch in filter option UI to filter.mood = { $all: mood } etc. and change to "all are checkboxes" again;
    if (mood) filter.mood = { $in: mood };
    if (occasion) filter.occasion = { $in: occasion };
    if (genre) filter["genres.id"] = { $in: genre };
    if (service) filter["streamingOptions.de.service.id"] = { $in: service };
    if (releaseYear && releaseYear !== "noRestriction") {
      let thisYear = new Date().getFullYear();
      filter.releaseYear = { $gte: thisYear - Number(releaseYear) };
    }
    if (tags) filter.tags = { $in: tags };
    console.log("filter:", filter);
    const movies = await Movie.find(filter).lean();

    // console.log(movies.length);
    // for(let movie of movies) {
    //   console.log(movie.title);
    //   if (mood) console.log("mood", movie.mood);
    // if (occasion) console.log("occasion", movie.occasion);
    // if (genre) console.log("genre", movie.genres);
    // if (service) console.log("service", movie.streamingOptions);
    //   if (tags) console.log("releaseYear", movie.tags);
    // }
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/moviepicker", async (req, res) => {
  // test if query parameters arrive:  res.json(req.query);

  try {
    //  filter movies by streaming (& occasion)
    const movies = await Movie.find({
      "streamingOptions.de": {
        $elemMatch: { "service.id": { $in: req.query.service } },
        //   "occasion": { $in: req.query.occasion}
      },
    })
      .select({
        _id: 1,
        title: 1,
        id: 1,
        releaseYear: 1,
        genres: 1,
        mood: 1,
        occasion: 1,
        tags: 1,
      })
      .lean();

    // res.json(movies);

    // console.log(typeof movies);
    // console.log(Array.isArray(movies));
    // console.log(Object.entries(movies[0]));

    // Score the remaining movies
    const filteredMovies = [];
    for (let movie of movies) {
      let score = 0;

      //  100 for each match mood, if “neutral”:  50 for other mood
      if (req.query.mood === "neutral") {
        score += 50;
        if (movie.mood.includes(req.query.mood)) {
          score += 50;
        }
      } else if (movie.mood.includes(req.query.mood)) {
        score += 100;
      }
      //console.log("movie mood ", movie.mood, "query mood ", req.query.mood, "score ", score);

      // 150: for match occasion: date, children
      // 100 for match occasion: others
      if (movie.occasion.includes(req.query.occasion)) {
        if (
          req.query.occasion === "children" ||
          req.query.occasion === "date"
        ) {
          score += 150;
        } else {
          score += 100;
        }
      }
      // console.log("movie occasion ", movie.occasion, "query occasion ", req.query.occasion, "score ", score);

      // 10 for each genre
      for (let genre of req.query.genre) {
        for (let genreOfMovie of movie.genres) {
          if (genreOfMovie.id === genre) {
            score += 10;
          }
        }
      }
      // console.log("movie genre ", movie.genres, "query genre ", req.query.genre, "score ", score);

      // 50 for each tag
      if (req.query.tags) {
        for (let tag of req.query.tags) {
          if (movie.tags.includes(tag)) {
            score += 50;
          }
        }
      }
      // console.log("movie tag ",  movie.tags, "query tag ", req.query.tags, "score ", score);

      let releaseYearMin =
        new Date().getFullYear() - Number(req.query.releaseYear);
      if (req.query.releaseYear === "noRestriction") {
        score += 10;
      } else if (movie.releaseYear >= releaseYearMin) {
        score += 20;
      }
      // console.log("movie releaseYear ",  movie.releaseYear, "query releaseYear ", req.query.releaseYear, "score ", score);

      if (score > 0) {
        movie.score = score;
        filteredMovies.push(movie);
      }
    }
    filteredMovies.sort((a, b) => b.score - a.score);
    // for(let movie of filteredMovies) {
    //   console.log(movie);
    // }
    res.json(filteredMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/movie/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    // const id = req.params.id;
    // let requestedId = String(req.params.id);
    const requestedId = req.params.id;
    // Check if the ID is a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(requestedId)) {
    //   return res.status(400).json({ message: "Invalid ID format" });
    // }
    // const movie = await Movie.findById({ requestedId }).lean();
    const movie = await Movie.findOne({ id: requestedId }).lean();
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    console.log(movie);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
