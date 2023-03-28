using System.ComponentModel.DataAnnotations;

namespace RatingTime.Domain.Models
{
    public class User
    {
        public int Id { get; set; }
        [MinLength(3)]
        public string Username { get; set; }
        public string Email { get; set; }
        [MinLength(8)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public List<Rating> Ratings { get; set; } = new List<Rating>();
    }
}