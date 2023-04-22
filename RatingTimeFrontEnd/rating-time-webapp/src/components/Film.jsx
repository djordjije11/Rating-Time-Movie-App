
import {useState} from "react";
export default function Film(props) {

  const [isClosed, setIsClosed] = useState(false);

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
            onClick={props.onClick}
            style={{
              marginTop: "20px",
              marginBottom: "10px",
              width: "18rem",
              height: "28rem",
            }}
          />
        <p className="movieTitle">{props.title}</p>
      </div>
    );

  }
  


  