import Film from "./Film";
import { useState, useEffect } from "react";

export default function Home(props) {
  const [message, setMessage] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTopMovies = async function() {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=8771fe8f23902acbfebb7de7c98e45ec&page=1"
      );
      const responseJson = await response.json();
      const topMovies = responseJson.results.slice(0, 50)
        .map(result => {
          return {
            title: result.title,
            imageUrl: `https://image.tmdb.org/t/p/original/${result.poster_path}`,
            rating: 0
          };
        });
      setMovies(topMovies);
    }
    getTopMovies();
  }, []);


  return (
    <>
      <div>
        <input type="text" id="inputSearch" />
        <button>Search</button>
      </div>
        <div className="movieWrapper">
          {movies.map((movie, index) => (
            <Film
              key={index}
              title={movie.title}
              image={movie.imageUrl}
              setMessage={setMessage}
              filmShown={true}
              rating={movie.rating}
              //setRating={(rating) => handleRatingChange(index, rating)}
            />
          ))}
        </div>
        
      
    </>
  );
}
