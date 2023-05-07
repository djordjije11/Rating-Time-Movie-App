using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RatingTime.DataAccess.Migrations.SqlServerMigrations
{
    /// <inheritdoc />
    public partial class AddedIndexForRating : Migration
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_rating_user_id_movie_id",
                table: "rating");

            migrationBuilder.CreateIndex(
                name: "ix_rating_user_id",
                table: "rating",
                column: "user_id");
        }
    }
}
