using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RatingTime.DataAccess.Migrations.SqlServerMigrations
{
    /// <inheritdoc />
    public partial class AddedIndexesForUsersUsernameAndEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "ix_user_email",
                table: "user",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_user_username",
                table: "user",
                column: "username",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_user_email",
                table: "user");

            migrationBuilder.DropIndex(
                name: "ix_user_username",
                table: "user");
        }
    }
}
