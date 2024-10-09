# Streaming Selector
React App that picks out a movie for the user to watch based on their answers to 6 questions. The website is based on [https://pickamovieforme.com/](https://pickamovieforme.com/) and was built for educational purposes only. The MongoDB database is generated from the [Streaming Availability API](https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability) and tagged with additional information. It currently stores information about almost 90 movies. 

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or MongoDBCompass installed

### Installation

### Setting Up the MongoDB Database

#### Option 1: Set Up MongoDB in Atlas

MongoDB Atlas is a cloud database service that makes it easy to set up and manage a database without hosting it yourself.

1. **Create an Atlas Account**

- Go to MongoDB Atlas and sign up for a free account.
- After signing in, follow the steps to create a new cluster (the free tier is enough for testing)

2. **Configure Cluster and Whitelist Your IP**

- Once your cluster is created, go to the Network Access tab and click "Add IP Address."
- Add your current IP address or choose "Allow Access From Anywhere" (not recommended for production)
- Go to the Database Access tab and define your username and password

3. **Get the Connection String**

- In your Atlas dashboard, go to the Database tab, click "Connect" and then click on "Drivers"
- Choose Node.js as the driver, copy the connection string, and replace the <username>, <password>, and <dbname> placeholders

4. **Import Seed Data**
Once you've set up your MongoDB Atlas account, you can import the seed data (provided as JSON files `streaming_selector.movies.json` and `streaming_selector.questions.json` in the root directory of this repo) into your new database.

- Install the MongoDB tools if they’re not installed:

```bash
npm install -g MongoDB
```

- Use mongoimport to import your seed data for both the movies and the questions collection:

```bash
mongoimport --uri "mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>" --collection <collection_name> --file ./data/<collection_name>.json --jsonArray
``` 

##### Option 2: Set Up MongoDB Locally with MongoDB Compass

If you prefer a local setup, MongoDB Compass is a GUI tool for managing your MongoDB databases.

1. **Download and Install MongoDB Compass**
- Download MongoDB Compass and install it on your machine

2. **Set Up a Local Database**
- Once installed, open MongoDB Compass and click "New Connection."
- For a local MongoDB instance, use the default connection string: `mongodb://localhost:27017/`
- Click "Connect"
  
3. **Create a New Database**
- In MongoDB Compass, click "Create Database"
- Provide a name for the database (e.g., moviedb) and a collection name "movies"
- Set up a second collection called "questions"

4. **Import Seed Data**
You can import the seed data from the JSON files `streaming_selector.movies.json` and `streaming_selector.questions.json` provided in the root directory of this repo into your new database via the MongoDBCompass GUI.
- Select the collection you just created.
- Click on Add Data > Import File and choose the JSON file you want to import.
- Repeat this process for the "questions" collection.

5. **Add the Connection String to Your .env File**
If you’re using a local MongoDB instance, use the following connection string in your .env file:
```bash
MONGO_URI=mongodb://localhost:27017/moviedb
```

### Setting Up the React App

1. **Clone the repository:**
```bash
   git clone https://github.com/tsr-alia/streaming_selector.git
   cd streaming-selector
```
2. **Set up environment variables:**
#### Server:
```bash
   cd server
   cp .env.example .env
```
- Update `.env` with your MongoDB Atlas connection string:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
```

#### Client:
```bash
   cd ../client
   cp .env.example .env
```
- Update `.env` with your API URL if different from the default.

3. **Install dependencies:**
- Go to the root directory
- Install all server and client dependencies from there:
```bash
   npm run install-all
```
4. **Run the App:**
- In the root directory, to start the app type:
```bash
npm run dev
```

5. **Access the App:**
- Frontend: [http://localhost:5173](http://localhost:5173/)
- Backend: http://localhost:27017 (as per `.env`)

## Technologies Used

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB Atlas

## Current Features

### "Find My Movie"

- Form with 6 questions:
  - What mood are you in today?
  - Who are you watching with? What's the occasion?
  - Do you have any genre preferences?
  - Which streaming services are available to you?
  - Preferences about the release year of the movie?
  - Do you have any additional preferences?

The users' answers are matched against the database which currently contains almost 90 movies. Those movies are first filtered by their streaming availability, making sure the user only gets recommendations for movies that they can watch on their streaming services. The matching movies are scored by how well they match the other user data and an array of data is returned. The first recommendation is shown, and others can be accessed subsequently.
On the result page, there is a streaming link to the movie, additional information and indicators of which of the users' preferences match the movie. There is an option to show the next recommendation and an option to restart the quiz.

### Movie Library

- Overview of all the movies in the database in a simple card grid.
- Filters that contain the same criteria as the quiz allow the user to manually search the available movies.

## Features to be Implemented (Excerpt)

### "Find My Movie"

- Implement more features to handle the quiz: genre preference matters / doesn't matter
- Filter streaming availability by user location
- Check for updated streaming availability right before showing results

### Movie Library

- Single View for each movie with all the information shown on the result page of the quiz.
- More features for the filters: deselect radio buttons

### User Profile

 - Let users register to save their locale and streaming options and prefill the form
 - Watched Lists and Favourites: Let users save their favourite and watched movies to their account
 - Use users' watched and favourite lists to individualize filtering for them

### Scalability, Database

- Automated Database Updates / Backend UI to control the data: implement a more streamlined process to download, tag and manage movie data
- Regularly update movie information by making calls to the external Streaming Availability API to keep up to date on the streaming availability
Account
- Once a bigger dataset of movies is implemented, refactor the filtering logic for the quiz to find the most efficient way to filter movies

## Data Sources

This project uses movie data from [Movie of the Night API](https://www.movieofthenight.com/). The data was downloaded and processed for educational purposes, in accordance with their terms of service. 

Please ensure that any use of this data complies with the [API's terms and conditions](https://www.movieofthenight.com/terms).
