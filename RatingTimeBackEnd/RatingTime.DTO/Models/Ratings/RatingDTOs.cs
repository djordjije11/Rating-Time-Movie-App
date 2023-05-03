using RatingTime.DTO.Models.Movies;

namespace RatingTime.DTO.Models.Ratings
{
    public record RatingInfo(int StarsNumber, MovieInfo Movie);
    public record RatingPost(int StarsNumber, RatingMoviePost Movie);
    public record RatingDelete(int MovieId);
}
