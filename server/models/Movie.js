import mongoose from "mongoose";

// sets the Schema for the movies collection that holds all information about the movies
const movieSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId, // Keep default ObjectId for _id
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imdbId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    overview: String,
    releaseYear: {
      type: Number,
      index: true,
    },
    genres: [
      {
        id: { type: String, index: true },
        name: String,
      },
    ],
    directors: [String],
    cast: [String],
    rating: Number,
    imageSet: {
      horizontalBackdrop: {
        w600: String,
      },
      verticalPoster: {
        w720: String,
      },
    },
    streamingOptions: {
      de: [
        {
          service: {
            id: { type: String, index: true },
            name: String,
            themeColorCode: String,
            imageSet: {
              lightThemeImage: { type: String, index: true },
            },
          },
          link: String,
        },
      ],
    },
    mood: [String],
    occasion: [String],
    tags: [String],
  },
  { collection: "movies", versionKey: false, timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
