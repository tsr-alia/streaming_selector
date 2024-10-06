# Streaming Selector
React App that picks out a movie for the user to watch based on their answers to 6 questions. The website is based on https://pickamovieforme.com/ and was built for educational purposes only. The MongoDB database is generated from the Streaming Availability API and tagged with additional information. It currently stores information about almost 90 movies. 

## Usage

- Install Node.js and npm
- Download all files from the repository
- In the client directory, type `npm install` to install dependencies
- In the server directory, type `npm install` to install dependencies
- To start the backend, go to the client directory and type `node server.js`.
- To start the frontend, go to the server directory and type `npm run ...`

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
