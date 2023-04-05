
import Film from "./Film";
import { useState, useEffect } from "react";

export default function Home(props) {
  const [message, setMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getTopMovies = async function(pageNumber) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=8771fe8f23902acbfebb7de7c98e45ec&page=${pageNumber}`
      );
      const responseJson = await response.json();
      const topMovies = responseJson.results.slice(0, 20)
        .map(result => {
          return {
            title: result.title,
            imageUrl: `https://image.tmdb.org/t/p/original/${result.poster_path}`,
            rating: 0
          };
        });
      setMovies(topMovies);
      
    }
    getTopMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

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
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(1)}>1</button>
        <button onClick={() => handlePageChange(2)}>2</button>
        <button onClick={() => handlePageChange(3)}>3</button>
      </div>
    </>
  );
}
