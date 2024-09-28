import express from 'express';
import Movies from '../models/Movies';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
    // filter logic
    //  const { ... } = req.query;

    const movies = await Movies.find().sort();
    res.json(items);
} catch (error) {
    res.status(500).json({message: error,message});
}
});

export default router;