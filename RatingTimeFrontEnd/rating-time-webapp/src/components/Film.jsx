
import { useState} from "react";
import StarRatings from 'react-star-ratings';
export default function Film(props) {

  const [isClosed, setIsClosed] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const [rating, setRating] = useState(props.rating);

  const closeButtonOnClick = () => {
    props.setFilmTitle("");
    props.setFilmImageUrl("");
    setIsClosed(true);
    removeCloseButton();
  };

  const removeCloseButton = () => {
    const closeButton = document.getElementById("closeButton");
    closeButton.removeEventListener("click", closeButtonOnClick);
    closeButton.remove();
  };

  const handleFilmClick = () => {
    setIsZoomed(true);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
    if (isClosed) {
      return null;
    }
  
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "1%",
        }}
      >
        {props.isSearchedMovie && (
          <button
            id="closeButton"
            style={{ alignSelf: "flex-end" }}
            onClick={closeButtonOnClick}
          >
            X
          </button>
        )}
          <img
            className="movieImg"
            src={props.image}
            alt={props.title}
            onClick={handleFilmClick}
            style={{
              marginTop: "20px",
              marginBottom: "10px",
              width: "18rem",
              height: "28rem",
            }}
          />
        <p className="movieTitle">{props.title}</p>
        
      {isZoomed && (
        <div className="zoomedWrapper" onClick={() => setIsZoomed(false)}>
          <div className="movieZoomed">
            <img src={props.image} alt={props.title} id="movieImgZoomed"/>
            <h3 style={{color:"#FFFDFA"}}>{props.title}</h3>
            <p style={{color:"#FFFDFA"}}>Rate this movie:</p>
            <StarRatings
              rating={rating}
              starRatedColor="orange"
              changeRating={handleRatingChange}
              numberOfStars={5}
              starDimension="30px"
              starSpacing="10px"
            />
            
          </div>
        </div>
      )}
      </div>
    );

  }
  


  