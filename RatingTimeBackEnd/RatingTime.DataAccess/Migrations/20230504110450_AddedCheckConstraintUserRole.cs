using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RatingTime.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddedCheckConstraintUserRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddCheckConstraint(
                name: "ck_user_role",
                table: "user",
                sql: "[role] in ('User', 'Admin')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "ck_user_role",
                table: "user");
        }
    }
}
