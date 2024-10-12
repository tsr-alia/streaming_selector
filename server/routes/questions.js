import express from "express";
// import functions to update questions based on options in movie database
import {
  updateGenreOptions,
  updateStreamingOptions,
} from "../controllers/movieController.js";
import Question from "../models/Question.js";

const router = express.Router();

// Get all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({id: 1});
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// call updateGenreOptions via this route
router.get("/update-genres", async (req, res) => {
  updateGenreOptions();
});

// call updateStreamingOptions via this route
router.get("/update-services", async (req, res) => {
  updateStreamingOptions();
});

export default router;
