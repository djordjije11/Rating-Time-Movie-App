import Film from "./Film";
import StarRatings from 'react-star-ratings';
export default function ZoomedFilms(props){
return (
<div className="zoomedWrapper">
          <div className="movieZoomed">
            <div className="movieImage">
              <button
                id="closeButton"
                style={{ alignSelf: "flex-end" }}
                onClick={props.closeZoomedMovie}
              >
                X
              </button>
              <Film
                title={props.title}
                image={props.image}
                voteAverage={props.voteAverage}
                isZoomed={true}
                setRating={props.setRating}
              />
            </div>
            <div className="zoomedRate">
              <p className="zoomedOverview">{props.overview}</p>
              <p style={{ color: "#FFFDFA" }}>Rate this movie:</p>
              <StarRatings
                rating={props.rating}
                starRatedColor="orange"
                changeRating={props.handleRatingChange}
                numberOfStars={5}
                starDimension="30px"
                starSpacing="10px"
              />
              <button
                className="button-28"
                style={{ marginTop: "1rem" }}
                onClick={() => {
                    props.addMovie();
                    props.setIsZoomed(false);
                }}
              >
                Save rating
              </button>
            </div>
          </div>
        </div>
);
}