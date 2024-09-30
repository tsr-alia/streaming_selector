import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    imdbId: {
        type: String,
        required: true,
        trim: true,
    },

    genres: [{
        id: { type: String, index: true},
        name: String
    }]

}, { collection: 'movies', versionKey: false });

const Movie = mongoose.model('Movie', movieSchema);
console.log(movieSchema.path('_id'));

export default Movie;