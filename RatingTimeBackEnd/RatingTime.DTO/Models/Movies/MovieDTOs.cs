using RatingTime.DTO.Models.Genres;

namespace RatingTime.DTO.Models.Movies
{
    public record MovieInfo(int Id, string Title, string? ImageUrl, string? Overview, double AverageRating);
    public record MovieDetailInfo(int Id, string Title, string? ImageUrl, string? Overview, double AverageRating, List<GenreInfo>? Genres);
    public record RatingMoviePost(int Id, string? Title, string? ImageUrl, string? Overview, double AverageRating, List<MovieGenrePost>? Genres);
}
