
// import Film from "./Film";
// import { useState, useEffect } from "react";

// export default function Home(props) {
//   // const [message, setMessage] = useState("");
//   const [movies, setMovies] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [txtState, setTxtState] = useState("");
//   const [filmTitle, setFilmTitle] = useState("");
//   const [filmImageUrl, setFilmImageUrl] = useState("");
//   // const [rating, setRating] = useState(0);
//   const filmShown = filmTitle !== "";


//   const getMovieFromSearch= async function(title){
//     const response= await fetch (
//       `https://api.themoviedb.org/3/search/movie?api_key=8771fe8f23902acbfebb7de7c98e45ec&query=${title}`
//     );
//     const responseJson= await response.json();
//     setFilmImageUrl(
//       `https://image.tmdb.org/t/p/original/${responseJson.results[0].poster_path}`
//     );
//     setFilmTitle(responseJson.results[0].title);
//   }

//   useEffect(() => {
//     const getTopMovies = async function(pageNumber) {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/movie/popular?api_key=8771fe8f23902acbfebb7de7c98e45ec&page=${pageNumber}`
//       );
//       const responseJson = await response.json();
//       const topMovies = responseJson.results.slice(0, 20)
//         .map(result => {
//           return {
//             title: result.title,
//             imageUrl: `https://image.tmdb.org/t/p/original/${result.poster_path}`,
//             rating: 0
//           };
//         });
//       setMovies(topMovies);
      
//     }
//     getTopMovies(currentPage);
//   }, [currentPage]);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   }

//   const handleClose = () => {
//     setFilmTitle("");
//     setFilmImageUrl("");
//     setTxtState("");
//   };

//   return (
//     <>
    
//       <div>
//         <input id="txtInput"
//             onClick={() => {
//               handleClose();
//             }}
//             type="text"
//             value={txtState}
//             onChange={(event) => setTxtState(event.target.value)}
//           />
//         <button onClick={() => getMovieFromSearch(txtState)}>Search</button>
//       </div>
//       {filmShown && (
//         <div className="movieSearch">
//             <Film
//               title={filmTitle}
//               image={filmImageUrl}
//               filmShown={true}
//               setFilmTitle={setFilmTitle}
//               setFilmImageUrl={setFilmImageUrl}
//           />

//           </div>
//       )}

//       <div className="movieWrapper">
//         {movies.map((movie, index) => (
//           <Film
//             key={index}
//             title={movie.title}
//             image={movie.imageUrl}
//             filmShown={true}
//             rating={movie.rating}
//           />
//         ))}
//       </div>
//       <div className="pagination">
//         <button onClick={() => handlePageChange(1)}>1</button>
//         <button onClick={() => handlePageChange(2)}>2</button>
//         <button onClick={() => handlePageChange(3)}>3</button>
//       </div>
//     </>
//   );
// }


import Film from "./Film";
import { useState, useEffect } from "react";

export default function Home(props) {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [txtState, setTxtState] = useState("");
  const [filmTitle, setFilmTitle] = useState("");
  const [filmImageUrl, setFilmImageUrl] = useState("");
  const [filmShown, setFilmShown] = useState(false);

  const getMovieFromSearch= async function(title){
    const response= await fetch (
      `https://api.themoviedb.org/3/search/movie?api_key=8771fe8f23902acbfebb7de7c98e45ec&query=${title}`
    );
    const responseJson= await response.json();
    setFilmImageUrl(
      `https://image.tmdb.org/t/p/original/${responseJson.results[0].poster_path}`
    );
    setFilmTitle(responseJson.results[0].title);
    setFilmShown(true);
  };

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

  const handleClose = () => {
    setFilmTitle("");
    setFilmImageUrl("");
    setTxtState("");
    setFilmShown(false);
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
        <button onClick={() => getMovieFromSearch(txtState)}>Search</button>
      </div>
      {filmShown && (
        <div className="movieSearch">
          <Film
            title={filmTitle}
            image={filmImageUrl}
            filmShown={filmShown}
            setFilmTitle={setFilmTitle}
            setFilmImageUrl={setFilmImageUrl}
            handleClose={handleClose}
          />
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
