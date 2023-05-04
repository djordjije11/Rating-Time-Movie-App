using RatingTime.DataAccess;
using RatingTime.Domain.Enums;
using RatingTime.Domain.Models;

namespace RatingTime.API.Seed
{
    public record TmdbGenres(List<Genre> Genres);

    public class Seeder
    {
        private readonly RatingTimeContext context;
        private readonly string tmdbApiUrl;

        public Seeder(RatingTimeContext context, string tmdbApiKey)
        {
            this.context = context;
            tmdbApiUrl = $"https://api.themoviedb.org/3/genre/movie/list?api_key={tmdbApiKey}";
        }

        private async Task SeedUsersAsync()
        {
            var users = new List<User>()
            {
                new User()
                {
                    Username = "djordjije11",
                    Email = "djole@gmail.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("Abrakadabra10"),
                    Role = UserRole.User
                },
                new User()
                {
                    Username = "jelena300",
                    Email = "jelena@gmail.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("Jeca1234"),
                    Role = UserRole.User
                },
                new User()
                {
                    Username = "jovajova23",
                    Email = "jova@gmail.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("Jova2323"),
                    Role = UserRole.User
                },
                new User()
                {
                    Username = "admin",
                    Email = "admin@gmail.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("Admin300"),
                    Role = UserRole.Admin
                },
                new User()
                {
                    Username = "administrator",
                    Email = "admin@admin.com",
                    Password = BCrypt.Net.BCrypt.HashPassword("Admin300"),
                    Role = UserRole.Admin
                }
            };
            await context.Users.AddRangeAsync(users);
        }

        private async Task SeedGenresAsync()
        {
            var httpClient = new HttpClient();
            var tmdbGenres = await httpClient.GetFromJsonAsync<TmdbGenres>(tmdbApiUrl);
            if(tmdbGenres != null)
            {
                await context.Genres.AddRangeAsync(tmdbGenres.Genres);
            }
        }

        public async Task<bool> SeedAsync()
        {
            try
            {
                if (context.Users.Any() == false)
                {
                    await SeedUsersAsync();
                }
                if (context.Genres.Any() == false)
                {
                    await SeedGenresAsync();
                }
                return await context.SaveChangesAsync() > 0;
            }
            catch
            {
                return false;
            }
        }
    }
}
