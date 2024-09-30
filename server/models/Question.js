import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
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
    question: {type: String},
    options: [
        {
            text: String,
            value: String,
        }
    ],
    type: { type: String}
}, { collection: 'questions', versionKey: false });

const Question = mongoose.model('Question', questionSchema);



export default Question;