import "../css/Home.css";

export const loader = function (type) {
  let movies = document.querySelector(".movie-wrapper");
  if (type === 2) {
    movies = document.querySelector(".movie-wrapper-searched");
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
  const { currentPage, handlePageChange, totalPages, toShow } = props;

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
      <span className="current-page">{currentPage}</span>
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
