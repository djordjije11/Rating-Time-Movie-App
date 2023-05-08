using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RatingTime.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddedOverviewAndAverageRatingToMovie : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "average_rating",
                table: "movie",
                type: "float(1)",
                precision: 1,
                scale: 1,
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "overview",
                table: "movie",
                type: "nvarchar(2048)",
                maxLength: 2048,
                nullable: true);

            migrationBuilder.AddCheckConstraint(
                name: "ck_movie_stars_number",
                table: "rating",
                sql: "[stars_number] >= 1 AND [stars_number] <= 5");

            migrationBuilder.AddCheckConstraint(
                name: "ck_movie_average_rating",
                table: "movie",
                sql: "[average_rating] >= 1 AND [average_rating] <= 5");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "ck_movie_stars_number",
                table: "rating");

            migrationBuilder.DropCheckConstraint(
                name: "ck_movie_average_rating",
                table: "movie");

            migrationBuilder.DropColumn(
                name: "average_rating",
                table: "movie");

            migrationBuilder.DropColumn(
                name: "overview",
                table: "movie");
        }
    }
}
