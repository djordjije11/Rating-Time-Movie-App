

export default function Film(props) {

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "1%",
        }}
      >
          <img
            className="movieImg"
            src={props.image}
            alt={props.title}
            onClick={props.onClick}
            style={{
              marginTop: "10px",
              marginBottom: "10px",
              width: props.isZoomed ? "26rem" : "auto",
              height: props.isZoomed ? "38rem" : "28rem",
            }}
          />
          {props.isSearchedMovie && (
            <p>{props.overview}</p>
          )}
        <p className="movieTitle">{props.title}</p>
      </div>
    );

  }
  


  