using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RatingTime.Domain.Enums;
using RatingTime.Domain.Models;
using RatingTime.Domain.Relationships;

namespace RatingTime.DataAccess
{
    public class RatingTimeContext : DbContext
    {
        public RatingTimeContext(DbContextOptions<RatingTimeContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<MovieGenre> MovieGenreList { get; set; }
        public DbSet<Rating> Ratings { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseQueryTrackingBehavior(QueryTrackingBehavior.TrackAll)
                .UseSnakeCaseNamingConvention()
                .LogTo(Console.Write, new[] { DbLoggerCategory.Database.Command.Name }, LogLevel.Information)
                .EnableDetailedErrors()
                .EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                        .Property(u => u.Username)
                        .UseCollation("SQL_Latin1_General_CP1_CS_AS");
            modelBuilder.Entity<User>()
                        .Property(u => u.Email)
                        .UseCollation("SQL_Latin1_General_CP1_CS_AS");
            modelBuilder.Entity<User>()
                        .Property(u => u.Password)
                        .UseCollation("SQL_Latin1_General_CP1_CS_AS");

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                entityType.SetTableName(entityType.DisplayName().ToLower());
            }

            modelBuilder.Entity<User>()
                        .Property(u => u.Username)
                        .HasMaxLength(40)
                        .HasColumnType("varchar(40)");
            modelBuilder.Entity<User>()
                        .Property(u => u.Email)
                        .HasMaxLength(320)
                        .HasColumnType("nvarchar(320)");
            modelBuilder.Entity<User>()
                        .Property(u => u.Password)
                        .HasColumnType("nvarchar(72)");
            modelBuilder.Entity<User>()
                        .Property(u => u.Role)
                        .HasConversion<string>()
                        .HasColumnType("varchar(40)")
                        .HasDefaultValue(UserRole.User);

            modelBuilder.Entity<User>()
                        .Metadata
                        .AddCheckConstraint("ck_user_role", "[role] in ('User', 'Admin')");

            modelBuilder.Entity<Movie>()
                        .Property(m => m.Title)
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");
            modelBuilder.Entity<Movie>()
                        .Property(m => m.ImageUrl)
                        .IsRequired(false)
                        .HasColumnType("varchar(2048)");
            modelBuilder.Entity<Movie>()
                        .Property(m => m.Id)
                        .ValueGeneratedNever();

            modelBuilder.Entity<Genre>()
                        .Property(g => g.Name)
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)");
            modelBuilder.Entity<Genre>()
                        .Property(g => g.Id)
                        .ValueGeneratedNever();

            modelBuilder.Entity<Rating>()
                        .Property(r => r.StarsNumber)
                        .HasColumnType("tinyint");

            modelBuilder.Entity<Rating>()
                        .HasOne(r => r.Movie)
                        .WithMany(/*m => m.Rating*/)
                        .HasForeignKey(r => r.MovieId)
                        .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Rating>()
                        .HasOne(r => r.User)
                        .WithMany(u => u.Ratings)
                        .HasForeignKey(r => r.UserId)
                        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MovieGenre>()
                        .HasOne(mg => mg.Movie)
                        .WithMany(m => m.MovieGenreList)
                        .HasForeignKey(mg => mg.MovieId)
                        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MovieGenre>()
                        .HasOne(mg => mg.Genre)
                        .WithMany(/*g => g.MovieGenreList*/)
                        .HasForeignKey(mg => mg.GenreId)
                        .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MovieGenre>()
                        .ToTable("movie_genre")
                        .HasIndex(mg => new { mg.MovieId, mg.GenreId })
                        .IsUnique();

            modelBuilder.Entity<Movie>()
                        .HasMany(m => m.Genres)
                        .WithMany()
                        .UsingEntity<MovieGenre>();

            modelBuilder.Entity<User>()
                        .HasIndex(u => u.Username)
                        .IsUnique();
            modelBuilder.Entity<User>()
                        .HasIndex(u => u.Email)
                        .IsUnique();

            modelBuilder.Entity<Rating>()
                        .HasIndex("UserId", "MovieId")
                        .IsUnique();
        }
    }
}
