using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RatingTime.DataAccess.Migrations.SqlServerMigrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "genre",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false),
                    name = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_genre", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "movie",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false),
                    title = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    image_url = table.Column<string>(type: "varchar(2048)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_movie", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "varchar(40)", maxLength: 40, nullable: false, collation: "SQL_Latin1_General_CP1_CS_AS"),
                    email = table.Column<string>(type: "nvarchar(320)", maxLength: 320, nullable: false, collation: "SQL_Latin1_General_CP1_CS_AS"),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false, collation: "SQL_Latin1_General_CP1_CS_AS"),
                    role = table.Column<string>(type: "varchar(40)", nullable: false, defaultValue: "User")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "movie_genre",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    movie_id = table.Column<int>(type: "int", nullable: false),
                    genre_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_movie_genre", x => x.id);
                    table.ForeignKey(
                        name: "fk_movie_genre_genre_genre_id",
                        column: x => x.genre_id,
                        principalTable: "genre",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_movie_genre_movie_movie_id",
                        column: x => x.movie_id,
                        principalTable: "movie",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "rating",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    stars_number = table.Column<byte>(type: "tinyint", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    movie_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_rating", x => x.id);
                    table.ForeignKey(
                        name: "fk_rating_movie_movie_id",
                        column: x => x.movie_id,
                        principalTable: "movie",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_rating_users_user_id",
                        column: x => x.user_id,
                        principalTable: "user",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_movie_genre_genre_id",
                table: "movie_genre",
                column: "genre_id");

            migrationBuilder.CreateIndex(
                name: "ix_movie_genre_movie_id_genre_id",
                table: "movie_genre",
                columns: new[] { "movie_id", "genre_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_rating_movie_id",
                table: "rating",
                column: "movie_id");

            migrationBuilder.CreateIndex(
                name: "ix_rating_user_id",
                table: "rating",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "movie_genre");

            migrationBuilder.DropTable(
                name: "rating");

            migrationBuilder.DropTable(
                name: "genre");

            migrationBuilder.DropTable(
                name: "movie");

            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
