using RatingTime.DTO.Models.Movies;

namespace RatingTime.DTO.Models.Ratings
{
    public record UserRatingInfo(int StarsNumber, MovieInfo Movie);
}
