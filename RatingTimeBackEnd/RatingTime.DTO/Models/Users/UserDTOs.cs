namespace RatingTime.DTO.Models.Users
{
    public record UserLogin(string? Username, string? Email, string Password);
    public record UserRegister(string Username, string Email, string Password);
}
