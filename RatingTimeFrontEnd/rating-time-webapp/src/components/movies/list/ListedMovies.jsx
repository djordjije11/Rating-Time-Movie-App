import Movie from "../single/Movie";

export default function ListedMovies(props) {
  const {movies, styleClassName, handleZoomChange} = props;
  return (
    <div className={styleClassName === "movie-wrapper-searched" ? "searched-movies" : undefined}>
      <div className={styleClassName ?? ""}>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            handleZoomChange={handleZoomChange}
          />
        ))}
      </div>
    </div>
  );
}