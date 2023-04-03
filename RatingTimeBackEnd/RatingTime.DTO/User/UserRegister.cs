using System.ComponentModel.DataAnnotations;
using System.Net;

namespace RatingTime.DTO.User
{
    public record UserRegister
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
