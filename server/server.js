import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';


const app = express();

// Middelware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected!'))
.catch((error) => console.log('Error connecting to MongoDB!', error));

// Routes
import moviesRoute from './routes/movies.js';

app.use('/api/items', itemsRoute);

const PORT = process.env.PORT || 27017;
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));