
import MovieDefinition from "../models/MovieDefinition";
const RATING_API_URL = "http://localhost:5165/api/rating";

class MovieController {
    
    static async getRatedMoviesFromDBAsync() {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      };
  
      try {
        const response = await fetch(
          RATING_API_URL,
          requestOptions
        );
  
        if (response.ok) {
          const responseJson = await response.json();
          const ratedMovies = responseJson.map((result) => {
            return new MovieDefinition(
              result.movie.id,
              result.movie.title,
              result.movie.imageUrl,
              result.starsNumber
            );
          });
  
          console.log("Rated movies retrieved successfully");
          
          return ratedMovies;
        } else {
          console.error("Failed to retrieve rated movies");
          return [];
        }
      } catch (error) {
        console.error("Error:", error);
        return [];
      }
    }

    static async addMovieToDBAsync(movie){
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify ({starsNumber: movie.rating,
          movie: {
            id:movie.id,
            title: movie.title,
            imageUrl: movie.imageUrl,
          }
          }),
          credentials: "include",
        };
        console.log(movie);
        try {
          const response = await fetch(
            RATING_API_URL,
            requestOptions
          );
    
          if (response.ok) {
            console.log("Movie added successfully");
          } else {
            console.error("Failed to add movie");
          }
        } catch (error) {
          console.error("Error:", error);
        }
    
    }

    static async deleteMovieFromDBAsync(id){
         const requestOptions = {
      method: "DELETE",
      body: JSON.stringify ({
          movieId:id,
        }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
  
    try {
      const response = await fetch(
       RATING_API_URL,
        requestOptions
      );
  
      if (response.ok) {
        console.log("Rated movie deleted successfully");
      } else {
        console.error("Failed to delete rated movie");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    }
  }
  
  export default MovieController;
  