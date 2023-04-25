import Film from "./Film";
import StarRatings from 'react-star-ratings';
export default function RatedFilms(props){
    
    function removeMovie(index){
        props.setMovies((prevMovies) => prevMovies.filter((_, i) => i !== index));
    }
  

    function updateMovie(){
      //PRIKAZATI ZOOMEDFILM
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
              onClick={() => updateMovie()}
            >
              Update the rating
            </button>
            </div>
          </div>
        ))}
      </div>
      

      </>
    )
}