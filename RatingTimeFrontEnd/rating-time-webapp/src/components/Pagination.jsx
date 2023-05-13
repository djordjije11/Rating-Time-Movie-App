export const loader = function (type) {
  let movies = document.querySelector(".movieWrapper");
  if (type === 2) {
    movies = document.querySelector(".movieWrapperSearched");
  }
  const loading = document.querySelector(".loading");
  if (!movies || !loading) {
    console.error("Required DOM elements not found.");
    return;
  }
  loading.style.display = "flex";
  movies.classList.add("blur");
  setTimeout(() => {
    loading.style.display = "none";
    movies.classList.remove("blur");
  }, 2000);
};

export default function Pagination(props) {
  const currentPage = props.currentPage;
  const handlePageChange = props.handlePageChange;
  const totalPages = props.totalPages;
  const toShow = props.toShow;

  return (
    <div
      className="pagination"
      style={{
        visibility: toShow ? "visible" : "hidden",
      }}
    >
      <button
        className="button-28"
        style={{ visibility: toShow && currentPage > 1 ? "visible" : "hidden" }}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        BACK
      </button>
      <span
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          fontSize: "25px",
        }}
      >
        {currentPage}
      </span>
      <button
        className="button-28"
        style={{
          visibility: toShow && currentPage < totalPages ? "visible" : "hidden",
        }}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        NEXT
      </button>
      <div className="loading">
        <div className="spinner"></div>
      </div>
    </div>
  );
}
