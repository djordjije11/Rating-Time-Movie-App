using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RatingTime.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddedUniqueIndexesForTmdbIdsAndRating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_rating_user_id",
                table: "rating");

            migrationBuilder.CreateIndex(
                name: "ix_rating_user_id_movie_id",
                table: "rating",
                columns: new[] { "user_id", "movie_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_movie_tmdb_id",
                table: "movie",
                column: "tmdb_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_genre_tmdb_id",
                table: "genre",
                column: "tmdb_id",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_rating_user_id_movie_id",
                table: "rating");

            migrationBuilder.DropIndex(
                name: "ix_movie_tmdb_id",
                table: "movie");

            migrationBuilder.DropIndex(
                name: "ix_genre_tmdb_id",
                table: "genre");

            migrationBuilder.CreateIndex(
                name: "ix_rating_user_id",
                table: "rating",
                column: "user_id");
        }
    }
}
