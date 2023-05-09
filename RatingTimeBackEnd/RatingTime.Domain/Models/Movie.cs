using RatingTime.Domain.Relationships;
using System.ComponentModel.DataAnnotations;

namespace RatingTime.Domain.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string? ImageUrl { get; set; }
        public string? Overview { get; set; }
        public decimal AverageRating { get; set; }
        //public List<Rating> Ratings { get; set; } = new List<Rating>();
        public List<MovieGenre> MovieGenreList { get; set; } = new List<MovieGenre>();
        public List<Genre> Genres { get; set; } = new List<Genre>();
    }
}
