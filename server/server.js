import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import moviesRoute from './routes/movies.js';
import questionsRoute from './routes/questions.js'

dotenv.config();

const app = express();

// Middelware
app.use(express.json());
app.use(cors( { 
    origin: '*'
}));

// Connect to MongoDB
async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
        console.log('MongoDB Connected!');
    } catch(error) {
        console.log('Error connecting to MongoDB!', error)
    }
}

connect();

// Routes
app.use('/api/movies', moviesRoute);
app.use('/api/questions', questionsRoute)

// Handle undefined Routes
app.use((req, res) => {
res.status(404).json({ message: 'Route Not Found' });
});

const PORT = process.env.PORT || 27017;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));