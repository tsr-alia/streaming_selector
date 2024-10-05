import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    question: { type: String },
    options: {
      type: [
        {
          text: String,
          value: String,
        },
      ],
      _id: false
    },
    type: { type: String },
    optional: Boolean
  },
  { collection: "questions", versionKey: false }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
