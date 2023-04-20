import Film from "./Film";
import { useState, useEffect } from "react";
import {API_KEY} from "../constants.js";

import StarRatings from 'react-star-ratings';
export default function Home(props) {

  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [txtState, setTxtState] = useState("");
  const [filmTitle, setFilmTitle] = useState("");
  const [filmImageUrl, setFilmImageUrl] = useState("");
  const [filmShown, setFilmShown] = useState(false);
  const [genres, setGenres] = useState([]);
  const [rating, setRating]= useState(0);


  const [zoomedMovie, setZoomedMovie] = useState(null);

  const getGenres = async function() {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    const responseJson = await response.json();
    setGenres(responseJson.genres);
  }


  const getMovieFromSearch= async function(title){
    const response= await fetch (
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`
    );
    const responseJson= await response.json();
    setFilmImageUrl(
      `https://image.tmdb.org/t/p/original/${responseJson.results[0].poster_path}`
    );
    setFilmTitle(responseJson.results[0].title);
    setFilmShown(true);
    setRating(0);
  };


  useEffect(() => {
    const getTopMovies = async function(pageNumber) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNumber}`
      );
      const responseJson = await response.json();
      const topMovies = responseJson.results.slice(0, 15)
        .map(result => {
          return {
            title: result.title,
            imageUrl: `https://image.tmdb.org/t/p/original/${result.poster_path}`,
            rating: rating
          };
        });
      setMovies(topMovies);
      
    }
    getTopMovies(currentPage);
    getGenres();
  }, [currentPage]);



  const handlePageChange = async (pageNumber) => {
    const selectedGenre = document.getElementById("genreSelect").value;
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&page=${pageNumber}`
    );
    const responseJson = await response.json();
    const moviesByGenre = responseJson.results.slice(0, 15).map(result => {
      return {
        title: result.title,
        imageUrl: `https://image.tmdb.org/t/p/original/${result.poster_path}`,
        rating: rating
      };
    });
    setMovies(moviesByGenre);
    window.scrollTo(0,0);
  }
  
  const handleGenreChange = async (event) => {
    const selectedGenre = event.target.value;
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`
    );
    const responseJson = await response.json();
    const moviesByGenre = responseJson.results.slice(0, 15)
      .map(result => {
        return {
          title: result.title,
          imageUrl: `https://image.tmdb.org/t/p/original/${result.poster_path}`,
          rating: rating
        };
      });
    setMovies(moviesByGenre);
  }
  
 
  const handleClose = () => {
    setFilmTitle("");
    setFilmImageUrl("");
    setTxtState("");
    setFilmShown(false);
  };
  
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setZoomedMovie({ ...zoomedMovie, rating: newRating });
    console.log(rating);
  };

  const handleMovieClick = (movie) => {
    setZoomedMovie(movie);
  };
  
  const addMovie = function () {
    props.setMovies((prev) => [
      ...prev,
      {
        title: filmTitle,
        imageUrl: filmImageUrl,
        rating: rating,
      },
    ]);
  };
  return (
    <>
    
      <div>
       
        <input 
          id="txtInput"
          onClick={() => {
            handleClose();
          }}
          type="text"
          value={txtState}
          onChange={(event) => setTxtState(event.target.value)}
        />
        <button style={{marginRight:"2%"}}onClick={() => getMovieFromSearch(txtState)}>Search</button>

        <select id="genreSelect" onChange={handleGenreChange}>
            <option value="">Select a genre</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
        </select>
      </div>
      {filmShown && (
        <div className="movieSearch">
          <Film 
            title={filmTitle}
            image={filmImageUrl} 
            filmShown={true}
            setFilmTitle={setFilmTitle}
            setFilmImageUrl={setFilmImageUrl}
            handleClose={handleClose}
            isSearchedMovie={true}
            rating={rating}
            setRating={setRating}
          />
          <div>
          <StarRatings
            rating={rating}
            starRatedColor="orange"
            changeRating={handleRatingChange}
            numberOfStars={5}
            starDimension="30px"
            starSpacing="5px"
          />
         
        </div>
          <button onClick={addMovie}  className="btn btn-dark"> Save rating</button>
        </div>

      )}
       
      <div className="movieWrapper">
        {movies.map((movie, index) => (
          <Film 
            key={index}
            title={movie.title}
            image={movie.imageUrl}
            filmShown={false}
            rating={movie.rating}
            isSearchedMovie={false}
            setZoomedMovie={handleMovieClick}
          />
          
        ))}
        
      </div>


      <div className="pagination">
        <button onClick={() => handlePageChange(1)}>1</button>
        <button onClick={() => handlePageChange(2)}>2</button>
        <button onClick={() => handlePageChange(3)}>3</button>
        <button onClick={() => handlePageChange(4)}>4</button>
      </div>
    </>
  );
}
