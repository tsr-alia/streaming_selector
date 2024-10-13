# Streaming Selector
React App that picks out a movie for the user to watch based on their answers to 6 questions. The website is based on [https://pickamovieforme.com/](https://pickamovieforme.com/) and was built for educational purposes only. The MongoDB database is generated from the [Streaming Availability API](https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability) and tagged with additional information with the help of AI. It currently stores information about almost 90 movies. 

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed
- **MongoDB Setup Options**:
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
  - [MongoDBCompass](https://www.mongodb.com/products/tools/compass) installed
  - [Docker](https://www.docker.com/) installed

### Installation

### Setting Up the MongoDB Database

#### Option 1: Set Up MongoDB in Atlas

MongoDB Atlas is a cloud database service that makes it easy to set up and manage a database without hosting it yourself.

1. **Create an Atlas Account**
- Go to [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) and sign up for a free account.
- After signing in, follow the steps to create a new cluster (the free tier is enough for testing).

2. **Configure Cluster and Whitelist Your IP**
- Once your cluster is created, go to the **Network Access** tab and click "Add IP Address".
- Click on "Add your current IP Address" to whitelist your current IP.
- Go to the **Database Access** tab and create a new database user with a username and password that you'll use to connect to the database.

3. **Import Seed Data**
- Once you've set up your MongoDB Atlas account, you can import the seed data (provided as JSON files `streaming_selector.movies.json` and `streaming_selector.questions.json` in the `data` directory of this repo) into your new database.
- Download and install the MongoDB Database Tools appropriate for your OS.
- Use `mongoimport` to Import Seed Data for both the movies and the questions collection:

```bash
mongoimport --uri "mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>" --collection movies --file ./data/streaming_selector.movies.json --jsonArray
mongoimport --uri "mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>" --collection questions --file ./data/streaming_selector.questions.json --jsonArray
``` 
- Make sure to replace `<username>`, `<password>`, and `<dbname>` with the correct values. Atlas doesn't automatically create a database when the cluster is set up. You can define your database name yourself. For example, you could name it `streaming_selector`.

##### Option 2: Set Up MongoDB Locally with MongoDB Compass

If you prefer a local setup, MongoDB Compass is a GUI tool for managing your MongoDB databases.

1. **Download and Install MongoDB Compass**
- Download [MongoDB Compass](https://www.mongodb.com/products/tools/compass) and install it on your machine.

2. **Set Up a Local Database**
- Once installed, open MongoDB Compass and click "New Connection".
- For a local MongoDB instance, use the default connection string: `mongodb://localhost:27017/`
- Click "Connect".
  
3. **Create a New Database and Collections**
- In MongoDB Compass, click "Create Database".
- Provide a name for the database (e.g., `streaming_selector`) and a collection name `movies`.
- Set up a second collection called `questions`.

4. **Import Seed Data**
- You can import the seed data from the JSON files `streaming_selector.movies.json` and `streaming_selector.questions.json` provided in the `data` directory of this repo into your new database via the MongoDBCompass GUI.
- Select the collection `movies` you have just created.
- Click on Add Data > Import File and choose the JSON file `./data/streaming_selector.movies.json` to import.
- Repeat this process for `./data/streaming_selector.questions.json` JSON file and import it in the `questions` collection.

##### Option 3: Use Docker to set up the Database
Docker allows you to set up MongoDB locally in a containerized environment without installing MongoDB directly on your machine.

1. **Install Docker**
- If you don't have Docker installed, download and install it from [docker.com](https://www.docker.com/).

2. **Run MongoDB via Docker**
- Run the following command to create and start a MongoDB instance in a Docker container:

```bash
docker run --name mongo -d -p 27017:27017 mongo
```
This command pulls the MongoDB image and runs it in a container, making MongoDB accessible at `mongodb://localhost:27017/`.

3. **Copy Seed Data Files into the Container**
- To import the seed data, you need to copy the JSON files `streaming_selector.movies.json` and `streaming_selector.questions.json` provided in the `data` directory of this repo into the Docker container. You can do this with the following commands:

```bash
docker cp ./data/streaming_selector.movies.json mongo:/streaming_selector.movies.json
docker cp ./data/streaming_selector.questions.json mongo:/streaming_selector.questions.json
```
This copies the files from your local `data` folder into the running MongoDB container.

4. **Import Seed Data**
- Now that the seed data is in the container, you can import it into MongoDB. The database and collections will be automatically created if they don't already exist.
- You can use the `mongoimport` command inside the Docker container to import the seed data into the database:
```bash
docker exec -i mongo mongoimport --db <dabname> --collection movies --file /streaming_selector.movies.json --jsonArray
docker exec -i mongo mongoimport --db <dabname> --collection questions --file /streaming_selector.questions.json --jsonArray
```
- Replace `<dbname>` with a database name of your choosing (e.g., `streaming_selector`).

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
- Update `.env` with your MongoDB connection string:
  - **For local MongoDB instance (Docker or MongoDB Compass)**:
  ```bash
  MONGO_URI=mongodb://localhost:27017/<dbname>
  ```
  Replace `<dbname>` with the name of the database you defined when uploading the seed data/creating the database. 
  - **For MongoDB Atlas:**:
  ```bash
  MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
  ```
  Replace `<username>`, `<password>`, and `<dbname>` with your Atlas credentials and database name you defined when uploading the seed data.

#### Client:

```bash
   cd ../client
   cp .env.example .env
```

3. **Install dependencies:**
- Return to the root and install all dependencies for the root, server, and client:
```bash
   npm run install-all
```
This script performs the following:

- Installs root dependencies (including concurrently).
- Installs server dependencies.
- Installs client dependencies.

4. **Run the App:**
- In the root directory, to start the app type:
```bash
npm run dev
```
This command concurrently starts both the client and server. 
- Client: Runs on http://localhost:5173
- Server: Runs on http://localhost:3000

5. **Access the App:**
- Open your browser and navigate to [http://localhost:5173](http://localhost:5173/) to view the frontend
- Backend: http://localhost:3000 (as per `.env`)

## Technologies Used

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB, Mongoose

## Current Features

### "Find My Movie"

- Form with 6 questions:
  - What mood are you in today?
  - Who are you watching with? What's the occasion?
  - Do you have any genre preferences?
  - Which streaming services are available to you?
  - Preferences about the release year of the movie?
  - Do you have any additional preferences?

The user's answers are matched against the database which currently contains almost 90 movies. Those movies are first filtered by their streaming availability, making sure the user only gets recommendations for movies that they can watch on streaming plattforms available to them. The remaining movies are ranked by how well they match the other user data. An array of results, ordered by relevance is returned. Using the results array, first the highest ranking match is fetched from the database.  
On the result page, there is a streaming link to the movie (deep link to the respective streaming plattform), additional information and indicators of which of the user's preferences match the movie. There is an option to show the next recommendation and an option to restart the quiz.

### Movie Library

- Overview of all the movies in the database in a simple card grid.
- Filters that contain the same criteria as the quiz allow the user to manually search the available movies.

## Features to be Implemented (Excerpt)

### "Find My Movie"

- Implement more features to handle the quiz (e.g., genre preference matters / doesn't matter).
- Filter streaming availability by user location.
- Check for updated streaming availability (via call to Streaming Availability API) right before showing results.
- Add a 7th optional question that aims at a more random fact about the user and match the answer with the movie descriptions in the dayabase (e.g., What is your dream vacation destination? or: What was your dream job as a child? etc.)

### Movie Library

- Single View for each movie with all the information shown on the result page of the quiz.
- More features for the filters (e.g., deselect radio buttons).

### User Profile

 - Let users register to save their locale and streaming options and prefill the form.
 - Watched Lists and Favourites: Let users save their favourite and watched movies to their account.
 - Use the user's watched and favourite lists to individualize filtering for them.

### Managing Data and Downloads

- Automated Database Updates / Backend UI to control the data: implement a more streamlined process to download, tag and manage movie data.
- Regularly update movie information by making calls to the external Streaming Availability API to keep up to date on the streaming availability.

### Scalability

- Once a bigger dataset of movies is implemented, refactor the filtering logic for the quiz to find the most efficient way to filter a big amount of movies.

## Data Sources

This project uses movie data from [Movie of the Night API](https://www.movieofthenight.com/). The data was downloaded and processed for educational purposes, in accordance with their terms of service. 

Please ensure that any use of this data complies with the API's terms and conditions.
