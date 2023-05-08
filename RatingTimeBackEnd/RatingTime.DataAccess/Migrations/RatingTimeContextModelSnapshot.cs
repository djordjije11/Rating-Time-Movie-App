﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RatingTime.DataAccess;

#nullable disable

namespace RatingTime.DataAccess.Migrations
{
    [DbContext(typeof(RatingTimeContext))]
    partial class RatingTimeContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("RatingTime.Domain.Models.Genre", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_genre");

                    b.ToTable("genre", (string)null);
                });

            modelBuilder.Entity("RatingTime.Domain.Models.Movie", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<double>("AverageRating")
                        .HasPrecision(1, 1)
                        .HasColumnType("float(1)")
                        .HasColumnName("average_rating");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("varchar(2048)")
                        .HasColumnName("image_url");

                    b.Property<string>("Overview")
                        .HasMaxLength(2048)
                        .HasColumnType("nvarchar(2048)")
                        .HasColumnName("overview");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("title");

                    b.HasKey("Id")
                        .HasName("pk_movie");

                    b.ToTable("movie", null, t =>
                        {
                            t.HasCheckConstraint("ck_movie_average_rating", "[average_rating] >= 1 AND [average_rating] <= 5");
                        });
                });

            modelBuilder.Entity("RatingTime.Domain.Models.Rating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("MovieId")
                        .HasColumnType("int")
                        .HasColumnName("movie_id");

                    b.Property<byte>("StarsNumber")
                        .HasColumnType("tinyint")
                        .HasColumnName("stars_number");

                    b.Property<int>("UserId")
                        .HasColumnType("int")
                        .HasColumnName("user_id");

                    b.HasKey("Id")
                        .HasName("pk_rating");

                    b.HasIndex("MovieId")
                        .HasDatabaseName("ix_rating_movie_id");

                    b.HasIndex("UserId", "MovieId")
                        .IsUnique()
                        .HasDatabaseName("ix_rating_user_id_movie_id");

                    b.ToTable("rating", null, t =>
                        {
                            t.HasCheckConstraint("ck_movie_stars_number", "[stars_number] >= 1 AND [stars_number] <= 5");
                        });
                });

            modelBuilder.Entity("RatingTime.Domain.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(320)
                        .HasColumnType("nvarchar(320)")
                        .HasColumnName("email")
                        .UseCollation("SQL_Latin1_General_CP1_CS_AS");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(72)
                        .HasColumnType("nvarchar(72)")
                        .HasColumnName("password")
                        .UseCollation("SQL_Latin1_General_CP1_CS_AS");

                    b.Property<string>("Role")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("varchar(40)")
                        .HasDefaultValue("User")
                        .HasColumnName("role");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("varchar(40)")
                        .HasColumnName("username")
                        .UseCollation("SQL_Latin1_General_CP1_CS_AS");

                    b.HasKey("Id")
                        .HasName("pk_user");

                    b.HasIndex("Email")
                        .IsUnique()
                        .HasDatabaseName("ix_user_email");

                    b.HasIndex("Username")
                        .IsUnique()
                        .HasDatabaseName("ix_user_username");

                    b.ToTable("user", null, t =>
                        {
                            t.HasCheckConstraint("ck_user_role", "[role] in ('User', 'Admin')");
                        });
                });

            modelBuilder.Entity("RatingTime.Domain.Relationships.MovieGenre", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("GenreId")
                        .HasColumnType("int")
                        .HasColumnName("genre_id");

                    b.Property<int>("MovieId")
                        .HasColumnType("int")
                        .HasColumnName("movie_id");

                    b.HasKey("Id")
                        .HasName("pk_movie_genre");

                    b.HasIndex("GenreId")
                        .HasDatabaseName("ix_movie_genre_genre_id");

                    b.HasIndex("MovieId", "GenreId")
                        .IsUnique()
                        .HasDatabaseName("ix_movie_genre_movie_id_genre_id");

                    b.ToTable("movie_genre", (string)null);
                });

            modelBuilder.Entity("RatingTime.Domain.Models.Rating", b =>
                {
                    b.HasOne("RatingTime.Domain.Models.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("fk_rating_movie_movie_id");

                    b.HasOne("RatingTime.Domain.Models.User", "User")
                        .WithMany("Ratings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_rating_users_user_id");

                    b.Navigation("Movie");

                    b.Navigation("User");
                });

            modelBuilder.Entity("RatingTime.Domain.Relationships.MovieGenre", b =>
                {
                    b.HasOne("RatingTime.Domain.Models.Genre", "Genre")
                        .WithMany()
                        .HasForeignKey("GenreId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_movie_genre_genre_genre_id");

                    b.HasOne("RatingTime.Domain.Models.Movie", "Movie")
                        .WithMany("MovieGenreList")
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_movie_genre_movie_movie_id");

                    b.Navigation("Genre");

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("RatingTime.Domain.Models.Movie", b =>
                {
                    b.Navigation("MovieGenreList");
                });

            modelBuilder.Entity("RatingTime.Domain.Models.User", b =>
                {
                    b.Navigation("Ratings");
                });
#pragma warning restore 612, 618
        }
    }
}
