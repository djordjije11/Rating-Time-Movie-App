﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using RatingTime.DataAccess;

#nullable disable

namespace RatingTime.DataAccess.Migrations
{
    [DbContext(typeof(RatingTimeContext))]
    [Migration("20230328144059_InitialMigration")]
    partial class InitialMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("RatingTime.Domain.Models.Genre", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("varchar(30)")
                        .HasColumnName("name");

                    b.Property<int>("TmdbId")
                        .HasColumnType("int")
                        .HasColumnName("tmdb_id");

                    b.HasKey("Id")
                        .HasName("pk_genre");

                    b.ToTable("genre", (string)null);
                });

            modelBuilder.Entity("RatingTime.Domain.Models.Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ImageUrl")
                        .HasColumnType("varchar(2048)")
                        .HasColumnName("image_url");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("title");

                    b.Property<int>("TmdbId")
                        .HasColumnType("int")
                        .HasColumnName("tmdb_id");

                    b.HasKey("Id")
                        .HasName("pk_movie");

                    b.ToTable("movie", (string)null);
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

                    b.HasIndex("UserId")
                        .HasDatabaseName("ix_rating_user_id");

                    b.ToTable("rating", (string)null);
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
                        .HasMaxLength(40)
                        .HasColumnType("varchar(40)")
                        .HasColumnName("password")
                        .UseCollation("SQL_Latin1_General_CP1_CS_AS");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("varchar(40)")
                        .HasColumnName("username")
                        .UseCollation("SQL_Latin1_General_CP1_CS_AS");

                    b.HasKey("Id")
                        .HasName("pk_user");

                    b.ToTable("user", (string)null);
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
                        .WithMany("Ratings")
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
                        .WithMany("MovieGenreList")
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

            modelBuilder.Entity("RatingTime.Domain.Models.Genre", b =>
                {
                    b.Navigation("MovieGenreList");
                });

            modelBuilder.Entity("RatingTime.Domain.Models.Movie", b =>
                {
                    b.Navigation("MovieGenreList");

                    b.Navigation("Ratings");
                });

            modelBuilder.Entity("RatingTime.Domain.Models.User", b =>
                {
                    b.Navigation("Ratings");
                });
#pragma warning restore 612, 618
        }
    }
}
