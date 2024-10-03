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
        unique: true
    },
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    overview: String,
    releaseYear: {
        type: Number,
        index: true
    },
    genres: [{
        id: { type: String, index: true},
        name: String
    }],
    directors: [String],
    cast: [String],
    rating: Number,
    imageSet: {
        horizontalBackdrop: {
            w600: String
        }
    },
    streamingOptions: {
        de: [{
            service: {
                id: {type: String, index: true},
                name: String,
                themeColorCode: String
            },
            link: String
        }]
    },
    mood: [
        String
    ],
    occasion: [
        String
    ],
    tags: [
        String
    ]

}, { collection: 'movies', versionKey: false, timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;