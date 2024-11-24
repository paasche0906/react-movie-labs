# Assignment 1 - ReactJS app.

Name: Jiacheng Pan
Student Number: 20108802
Youtube Link: https://www.youtube.com/watch?v=9z01CFAJP3s&t=23s

## Overview.

This repository contains a ReactJS-based movie app called ‘React Movies App’. The app provides a rich interface for exploring movie details, including viewing a list of popular movies, searching for specific movies, viewing details, and more. The included api file contains functions for interacting with external movie APIs (such as fetching data about movies). A series of components including buttons, filters, etc.; Context files are used to manage global states such as user authentication, theme settings, or movie data across the application. The goal of this project is to create a user-friendly movie browsing experience using various features of React such as components, state management, and API integration.

### Features.

+ Pagination
+ Third-party authentication with Firebase(Google)
+ Sort function
+ Filter function(New UI and more function options)
+ Card Icons(add/remove to favorite, add/remove to watchlist, write reviews)
+ Show top six billed casts and top four videos
+ Extensive linking of information(movie details contains links to actors; actor details links to movies)

## Setup requirements.

1. Start by cloning the repository from GitHub. Run the following command in your terminal:
  git clone [<repository_url>](https://github.com/paasche0906/react-movie-labs.git)
2. Navigate to the cloned project directory:
  cd Movies
3. Install Dependencies: Run the following command to install all necessary dependencies:
  npm install
4. Create a .env file in the root directory of your project.
Add the required environment variables as specified in the documentation. The file should contain variables like API keys for the movie database, Firebase configurations, and any other sensitive information needed. For example:
  REACT_APP_API_KEY=your_movie_db_api_key
  REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
  REACT_APP_AUTH_DOMAIN=your_firebase_auth_domain
  ...
5. Ensure that Firebase is correctly configured.
Update src/firebase.js with your specific Firebase project credentials. This will typically include keys like API key, authentication domain, project ID,etc.   
6. Run the Application: To start the development server, run the following command:
  npm start
Open http://localhost:3000 in your browser to see the application in action.
7. Install Missing Global Packages
Depending on your environment, you might need to install some tools globally, such as:
  npm install -g firebase-tools

## API endpoints.

### Static endpoints 
+ Retrieves a list of upcoming movies - UpcomingMoviesPage
+ Lists movies trending today - TrendingTodayPage
+ Lists popular movies - PopularMoviesPage
+ Lists the top-rated movies - TopRatedMoviesPage
+ Lists all movies marked as favorite by the user - FavoriteMoviesPage
+ Lists all movies added to the user's watchlist - WatchlistMoviesPage

### Parameterised endpoint
+ Adds a review for a particular movie by ID  - MovieReviewPage
+ Fetches detailed information about a specific movie by ID - MoviePage
+ Lists recommended movies based on the selected movie - RecommendationsPage
+ Fetches movies similar to the specified movie - SimilarMoviesPage
+ Gets videos associated with a movie - MovieVideoPage
+ Retrieves the cast and crew for a movie - MovieCreditsPage
+ Fetches details about a person - PersonDetailsPage

## Routing.

+ /reviews/:id - displays the review of a particular movie by ID. 
+ /movies/favorites - displays the list of favorite movies marked by the user.
+ /movies/watchlists - displays the list of movies added to the user's watchlist.
+ /movies/:id - displays details of a particular movie.
+ / - displays the homepage with featured and popular content.
+ /reviews/form - form to add a new movie review. 
+ /movies/upcoming - displays a list of upcoming movies. 
+ /movies/trending/today - displays movies trending today.
+ /movie/:id/recommendations - displays movies recommended based on the selected movie.
+ /movies/popular - displays popular movies.
+ /movies/top_rated - displays the top-rated movies.
+ /movie/:id/similar - displays movies similar to the one being viewed.
+ /movie/:id/videos - displays videos related to a particular movie.
+ /movie/:id/credits - displays cast and crew information of a movie.
+ /person/:personId - displays detailed information about an individual (actor, director, etc.).

### Protected Routes:
/movies/favorites: Requires user authentication to view the list of favorite movies. 
/movies/watchlists: Requires user authentication to view the watchlist. 
/reviews/form: Requires user authentication to add a movie review. 

## Independent learning (If relevant).

1. Third-party authentication with Firebase(Google)
### The included files are: 
- components/SignInButton/index.js
- components/siteHeader/index.js
- contexts/authContext.js
- firebase.js
- index.js
### Reference Video Link:
https://www.youtube.com/watch?v=fgdpvwEWJ9M
### Implementation steps:
(1) Add the web application to the Firebase console and get the Firebase configuration.
(2) Install the Firebase SDK and initialise it in your project.
(3) Create a login component that allows users to authenticate with Firebase.
(4) Use React Context to manage user state, making login information available throughout the application.

2. Pagination
### The included files are: 
- api/tmdb-api.js
- components/pagination/index.js
- pages
### Reference Blog Link:
https://blog.csdn.net/xin915/article/details/122369777
### Implementation steps:
(1) Prepare the back-end API to support paging.
(2) Creating a function to get paging data.
(3) Creating a Pager Component.
(4) Use useState to manage the current page number in the target page and fetch data dynamically via React Query or other data fetching libraries.