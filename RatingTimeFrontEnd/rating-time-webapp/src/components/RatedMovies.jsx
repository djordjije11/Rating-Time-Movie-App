import Movie from "./Movie";
import ZoomedMovie from "./ZoomedMovie";
import StarRatings from "react-star-ratings";
import { useState } from "react";
import PropTypes from "prop-types";
import MovieDefinition from "../models/MovieDefinition";
import MovieService from "../services/MovieService";
import Swal from "sweetalert2";

RatedMovies.propTypes = {
  ratedMovies: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(MovieDefinition).isRequired,
      PropTypes.any,
    ])
  ),
  setRatedMovies: PropTypes.func,
};

export default function RatedMovies(props) {
  const [ratedMovies, setRatedMovies] = [
    props.ratedMovies,
    props.setRatedMovies,
  ];
  const [showZoomedFilm, setShowZoomedFilm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const swalOptions = {
    customClass: {
      container: 'custom-container-class',
      title: 'custom-title-class',
      content: 'custom-content-class',
      confirmButton: 'custom-confirm-button-class',
    },
  };
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });
  function removeMovie(index, ratedMovie) {
    swalWithBootstrapButtons.fire({
      title: 'Are you sure you want to delete the movie?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMovieFromDBAsync(ratedMovie.id);
        setRatedMovies((prevMovies) => prevMovies.filter((_, i) => i !== index));
        swalWithBootstrapButtons.fire(
          'Deleted!',
           ratedMovie.title+' has been deleted.',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
   
  }
  const deleteMovieFromDBAsync = async function (id) {
    MovieService.deleteMovieFromDBAsync(id);
  };
  function updateMovieRating(index) {
    setSelectedMovie(ratedMovies[index]);
    setShowZoomedFilm(true);
  }
  function closeZoomedMovie() {
    setShowZoomedFilm(false);
  }
  function handleRatingChange(newRating) {
    setSelectedMovie({ ...selectedMovie, rating: newRating });
  }
  async function addMovie() {
    const response= await MovieService.addMovieToDBAsync(selectedMovie);
    // PROVERITI DA LI SE SACUVALO USPESNO
    // AKO JESTE - IZVRSI DALJE KOD, SACUVAJ I U REACTU
    // AKO NIJE - PRIKAZI GRESKU, NEKAKO JE OBRADI I NE CUVAJ U REACTU
    // treba proci ceo kod jos par puta i sagledati ovako svaki slucaj...
    if (response.ok ) {
      Swal.fire({
        ...swalOptions,
        icon: "success",
        title: 'You successfully rated '+selectedMovie.title +' with '+selectedMovie.rating+' stars!',
      })
      setRatedMovies((prevMovies) =>
      prevMovies.map((movie) => {
        if (movie.id === selectedMovie.id) {
          return selectedMovie;
        }
        return movie;
      })
    );
    }
    else{
      Swal.fire({
        ...swalOptions,
        icon: "error",
        title: 'Error occurred',
        text: 'Please try again',
      });
      return;
    }
    setSelectedMovie(null);
  }

  return (
    <div className="movieWrapper">
      {ratedMovies.map((ratedMovie, index) => (
        <div className="movies">
          <Movie key={index} movie={ratedMovie} />
          <StarRatings
            rating={ratedMovie.rating}
            starRatedColor="orange"
            numberOfStars={5}
            starDimension="30px"
            starSpacing="10px"
          /> 
          <div className="btnRatedMovies">
            <button
              className="button-28"
              style={{
                width: "10rem",
                height: "3rem",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
              onClick={() => removeMovie(index, ratedMovie)}
            >
              Remove the rating
            </button>
            <button
              className="button-28"
              style={{
                width: "10rem",
                height: "3rem",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
              onClick={() => updateMovieRating(index)}
            >
              Update the rating
            </button>
            
          </div>
        </div>
      ))}

      {showZoomedFilm && selectedMovie && (
        <ZoomedMovie
          movie={selectedMovie}
          handleRatingChange={handleRatingChange}
          addMovie={addMovie}
          setIsZoomed={setShowZoomedFilm}
          closeZoomedMovie={closeZoomedMovie}
        />
      )}
    </div>
  );
}
