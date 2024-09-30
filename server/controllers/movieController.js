import Movie from '../models/Movie.js';
import Question from '../models/Question.js';

export const getGenres = async () => {
    try {
        const genres = await Movie.distinct('genres');
        return genres;
    } catch (error) {
        console.log('An error has occurred fetching genres!', error);
        throw error;
    }
};

getGenres()
    .then(ids => {
        console.log("Unique Genre IDs:", ids);
    })
    .catch(error => {
        console.error("Error fetching genre IDs!", error);
    });

export const updateGenreOptions = async () => {
    try {
      const genreOptions = await getGenres();
  
      // Upsert: Update if exists, else create
      const result = await Question.findOneAndUpdate(
        {name: "genre"}, // Filter: assuming only one summary document exists
        { options: genreOptions },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
  
      console.log('CategoriesSummary updated:', result);
      return result;
    } catch (error) {
      console.error('Error updating CategoriesSummary:', error);
    }
  };

export const getAndFilterAllMovies = async (req, res) => {
    try {
        let filters = {};
        let sort = {};
        const movies = await Movie.find(filter).sort();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

// get single movie by id (for detail pages)

// filter logic for movie picker