namespace RatingTime.Domain.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public int TmdbId { get; set; }
        public string Title { get; set; }
        public string? ImageUrl { get; set; }
        public List<Rating> Ratings { get; set; } = new List<Rating>();
        public List<Genre> Genres { get; set; } = new List<Genre>();
    }
}
