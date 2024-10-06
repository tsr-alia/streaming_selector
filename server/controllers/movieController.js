import Movie from "../models/Movie.js";
import Question from "../models/Question.js";

// get a unique array of all the genre options based on the current state of the movies collection and format it to fit the Questions Model
export const getGenres = async () => {
  try {
    const genres = await Movie.distinct("genres");
    console.log("Unique Genre IDs:", genres);
    const genresFormatted = [];
    genres.map((genre) => {
      let genreFormatted = {
        value: genre.id,
        text: genre.name,
      };
      genresFormatted.push(genreFormatted);
    });
    return genresFormatted;
  } catch (error) {
    console.log("An error has occurred fetching genres!", error);
    throw error;
  }
};

// find the document with the question with the name === genre and update the options
export const updateGenreOptions = async () => {
  try {
    const genreOptions = await getGenres();
    const result = await Question.findOneAndUpdate(
      { name: "genre" },
      { options: genreOptions },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log("Genre Options updated:", result);
    return result;
  } catch (error) {
    console.error("Error updating Genre Options:", error);
  }
};

// get an array of distinct streaming services from the movies collection (using unwind in an aggregate function and projection to format the data)
export const getServices = async () => {
  try {
    const services = await Movie.aggregate([
      { $unwind: "$streamingOptions.de" }, // deconstruct the array
      {
        $group: {
          _id: "$streamingOptions.de.service.id", // Group by service.id
          name: { $first: "$streamingOptions.de.service.name" },
        },
      },
      {
        $project: {
          _id: 0,
          value: "$_id",
          text: "$name",
        },
      },
      {
        $sort: { text: 1 },
      },
    ]);
    console.log("Unique Streaming IDs:", services);
    return services;
  } catch (error) {
    console.log("An error has occurred fetching streaming services!", error);
    throw error;
  }
};

// update the document for the question with name === service
export const updateStreamingOptions = async () => {
  try {
    const streamingOptions = await getServices();
    const result = await Question.findOneAndUpdate(
      { name: "service" },
      { options: streamingOptions },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log("Streaming Options updated:", result);
    return result;
  } catch (error) {
    console.error("Error updating Streaming Options:", error);
  }
};

// tbd: implement filters for movies here, currently in movies.js
export const getAndFilterAllMovies = async (req, res) => {
  try {
    let filters = {};
    let sort = {};
    const movies = await Movie.find(filter).sort();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single movie by id (for detail pages)

// filter logic for movie picker, TBD: move here from movies.js
