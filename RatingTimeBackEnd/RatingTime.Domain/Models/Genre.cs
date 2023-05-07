using System.ComponentModel.DataAnnotations;

namespace RatingTime.Domain.Models
{
    public class Genre
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        //public List<MovieGenre> MovieGenreList { get; set; } = new List<MovieGenre>();

        public override string ToString() => $"ID: {Id}, Name: {Name}";
    }
}
