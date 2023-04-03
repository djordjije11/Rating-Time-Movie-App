using System.ComponentModel.DataAnnotations;

namespace RatingTime.DTO.User
{
    public record UserRegister
    {
        public string Username { get; set; }
        [MinLength(3)]
        [EmailAddress]
        public string Email { get; set; }
        [MinLength(8)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
