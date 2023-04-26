import Film from "./Film";
import ZoomedFilm from "./ZoomedFilm";
import StarRatings from 'react-star-ratings';
import { useState, useEffect } from "react";

export default function RatedFilms(props){

  const [showZoomedFilm, setShowZoomedFilm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

    function removeMovie(index){
        props.setMovies((prevMovies) => prevMovies.filter((_, i) => i !== index));
    }
  
    function updateMovieRating(index){
      setSelectedMovie(props.movies[index]);
      setShowZoomedFilm(true);
    }

    function closeZoomedMovie(){
      setShowZoomedFilm(false);
    }

    function handleRatingChange(newRating){
      setSelectedMovie({...selectedMovie, rating: newRating});
    }
  
    function addMovie(){
      props.setMovies(prevMovies => prevMovies.map(movie => {
        if (movie.title === selectedMovie.title) {
          return selectedMovie;
        }
        return movie;
      }));
      setSelectedMovie(null);
    }
  
    return(
        <>
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap"
        }}
        
        >
        {props.movies.map((movie, index) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "20px",
              padding: "50px",
              alignItems: "center",
            }}
          >
            <Film
              title={movie.title}
              image={movie.imageUrl}
              rating={movie.rating}
              filmShown={true}
              voteAverage={movie.voteAverage}
            />
            <StarRatings
              rating={movie.rating}
              starRatedColor="orange"
              numberOfStars={5}
              starDimension="30px"
              starSpacing="10px"
            />
            <div className="btnRatedMovies"> 
            <button
              class="button-28"
              style={{ width: "10rem", height: "3rem", marginBottom: "1rem", marginTop: "1rem"}}
              onClick={() => removeMovie(index)}
            >
              Remove the rating
            </button>
            <button
              class="button-28"
              style={{ width: "10rem", height: "3rem", marginBottom: "1rem", marginTop: "1rem"}}
              onClick={() => updateMovieRating(index)}
            >
              Update the rating
            </button>
            </div>
          </div>
        ))}

      {showZoomedFilm && selectedMovie && (
        <ZoomedFilm
          title={selectedMovie.title}
          image={selectedMovie.imageUrl}
          voteAverage={selectedMovie.voteAverage}
          overview={selectedMovie.overview}
          rating={selectedMovie.rating}
          handleRatingChange={handleRatingChange}
          addMovie={addMovie}
          setIsZoomed={setShowZoomedFilm}
          closeZoomedMovie={closeZoomedMovie}
        />
      )}
      </div>
      </>
    )
}