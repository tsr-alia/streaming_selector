import Movie from '../models/Movie.js';
import Question from '../models/Question.js';

export const getGenres = async () => {
    try {
        const genres = await Movie.distinct('genres');
        console.log("Unique Genre IDs:", genres);
        const genresFormatted = [];
        genres.map((genre) => {
            let genreFormatted = {
                value: genre.id,
                text: genre.name
            };
            genresFormatted.push(genreFormatted);
        })
        return genresFormatted;
    } catch (error) {
        console.log('An error has occurred fetching genres!', error);
        throw error;
    }
};

// getGenres()
//     .then(ids => {
//         console.log("Unique Genre IDs:", ids);
//     })
//     .catch(error => {
//         console.error("Error fetching genre IDs!", error);
//     });

export const updateGenreOptions = async () => {
    try {
      const genreOptions = await getGenres();
     // Upsert: Update if exists, else create
            // { options: genreOptions },
      const result = await Question.findOneAndUpdate(
        {name: "genre"}, // Filter: assuming only one summary document exists
 
        { options: genreOptions},
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
  
      console.log('Genre Options updated:', result);
      return result;
    } catch (error) {
      console.error('Error updating Genre Options:', error);
    }
  };

  export const getServices = async () => {
    try {
        // const services = await Movie.distinct('streamingOptions.de.service.id');
        const services = await Movie.aggregate([
            { $unwind: "$streamingOptions.de"}, // deconstruct the array
            {
                $group: {
                    _id: "$streamingOptions.de.service.id", // Group by service.id
                    name: { $first: "$streamingOptions.de.service.name" }
                }
            },
            {
                $project: {
                    _id: 0,
                    value: "$_id",
                    text: "$name"                    
                }
            },
            {
                $sort: { text: 1 }
            }
        ]);
        console.log("Unique Streaming IDs:", services);
        return services;
    } catch (error) {
        console.log('An error has occurred fetching streaming services!', error);
        throw error;
    }
};

  export const updateStreamingOptions = async () => {
    try {
      const streamingOptions = await getServices();
     // Upsert: Update if exists, else create
            // { options: genreOptions },
      const result = await Question.findOneAndUpdate(
        {name: "service"}, // Filter: assuming only one summary document exists
 
        { options: streamingOptions},
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
  
      console.log('Streaming Options updated:', result);
      return result;
    } catch (error) {
      console.error('Error updating Streaming Options:', error);
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