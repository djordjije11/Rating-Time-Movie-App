

export default function Film(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "30px",
      }}
    >
      {props.filmShown && (
        <button
          style={{ alignSelf: "flex-end" }}
          onClick={() => {
            props.setFilmTitle("");
            props.setFilmImageUrl("");
          }}
        >
          X
        </button>
      )}
      <img
        src={props.image}
        alt={props.title}
        style={
          props.image !== ""
            ? {
                marginTop: "20px",
                marginBottom: "10px",
                width: "24rem",
                height: "34rem",
              }
            : {}
        }
      />
      <p style={{ fontSize: "x-large", textAlign: "center" }}>{props.title}</p>
    </div>
  );
}
