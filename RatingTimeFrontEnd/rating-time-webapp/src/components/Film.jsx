import EmptyStar from "./EmptyStar";
import FullStar from "./FullStar";
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
        {/* <div style={{textAlign:"center"}}>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((index) => (
          <span onClick={() => props.setRating(index)}>
            {props.filmShown ? (
              props.rating < index ? (
                <EmptyStar />
              ) : (
                <FullStar />
              )
            ) : (
              <></>
            )}
          </span>
        ))}
      </div> */}
      {isZoomed && (
        <div style={{ position: 'fixed', textAlign:'center',top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000 }}>
          <div style={{ position: 'absolute', top: '30%', bottom:'20%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px' }}>
            <img src={props.image} alt={props.title} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
            <h3>{props.title}</h3>
            <p>Please rate this movie:</p>
            <StarRatings
              rating={rating}
              starRatedColor="orange"
              changeRating={handleRatingChange}
              numberOfStars={5}
              starDimension="30px"
              starSpacing="10px"
            />
            <div>
            <button onClick={() => setIsZoomed(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
      </div>
    );

  }
  


  