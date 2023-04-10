export default function Film(props) {
  const closeButtonOnClick = () => {
    props.setFilmTitle("");
    props.setFilmImageUrl("");
    removeCloseButton();
  };

  const removeCloseButton = () => {
    const closeButton = document.getElementById("closeButton");
    closeButton.removeEventListener("click", closeButtonOnClick);
    closeButton.remove();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "30px",
      }}
    >
      {props.filmShown && (
        <button id="closeButton"
          style={{ alignSelf: "flex-end" }}
          onClick={closeButtonOnClick}
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
