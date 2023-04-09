using RatingTime.Domain.Relationships;
using System.ComponentModel.DataAnnotations;

namespace RatingTime.Domain.Models
{
    public class Genre
    {
        [Key]
        public int Id { get; set; }
        public int TmdbId { get; set; }
        public string Name { get; set; }
        //public List<MovieGenre> MovieGenreList { get; set; } = new List<MovieGenre>();
    }
}
