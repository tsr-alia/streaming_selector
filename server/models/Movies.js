import mongoose from "mongoose";

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    imdbId: {
        type: String,
        required: true,
        trim: true,
    }
});

const Movies = mongoose.Model('Movies', moviesSchema);
console.log(Movies);

export default Movies;