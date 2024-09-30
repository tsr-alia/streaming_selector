import express from 'express';
import { getGenres, updateGenreOptions } from '../controllers/movieController.js';
import Question from '../models/Question.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
    // filter logic
    //  const { ... } = req.query;
    let filter = {};
    let sort = {};

    const questions = await Question.find().sort();
    res.json(questions);
} catch (error) {
    res.status(500).json({message: error.message});
}
});

router.get('/update-genres', updateGenreOptions);

export default router;