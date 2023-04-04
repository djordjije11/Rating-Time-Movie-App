

export default function Film(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "30px",
      }}
    >
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
      <p style={{ fontSize: "x-large", textAlign: "center"}}>{props.title}</p>
      
    </div>
  );
}
