using RatingTime.DTO.Models.Genres;

namespace RatingTime.DTO.Models.Movies
{
    public record MovieInfo(int Id, string Title, string? ImageUrl);
    public record MovieDetailInfo(int Id, string Title, string? ImageUrl, List<GenreInfo>? Genres);
    public record RatingMoviePost(int Id, string? Title, string? ImageUrl, List<MovieGenrePost>? Genres);
}
