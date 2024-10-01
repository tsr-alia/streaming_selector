import express from 'express';
import { getGenres, updateGenreOptions } from '../controllers/movieController.js';
import Movie from '../models/Movie.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
    // filter logic
    //  const { ... } = req.query;
    let filter = {};
    let sort = {};

    const movies = await Movie.find().sort();
    res.json(movies);
    console.log(movies[0]);
} catch (error) {
    res.status(500).json({message: error.message});
}
});

export default router;