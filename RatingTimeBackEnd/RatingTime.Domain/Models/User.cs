namespace RatingTime.Domain.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Rating> Ratings { get; set; } = new List<Rating>();
        public UserRole Role { get; set; }
    }
}