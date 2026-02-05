using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class EnhancedModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PublicationDate",
                table: "Books",
                newName: "PublishDate");

            migrationBuilder.AddColumn<string>(
                name: "Avatar",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Available",
                table: "Books",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Books",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CoverImage",
                table: "Books",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Books",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Pages",
                table: "Books",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Publisher",
                table: "Books",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "TotalCopies",
                table: "Books",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Fictional literature and novels", "Fiction" },
                    { 2, "Science and technology books", "Science" },
                    { 3, "Historical books and biographies", "History" },
                    { 4, "Personal development and self-improvement", "Self-Help" },
                    { 5, "Programming and IT books", "Technology" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Books_CategoryId",
                table: "Books",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Categories_CategoryId",
                table: "Books",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Categories_CategoryId",
                table: "Books");

            migrationBuilder.DropIndex(
                name: "IX_Books_CategoryId",
                table: "Books");

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DropColumn(
                name: "Avatar",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Available",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "CoverImage",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Pages",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Publisher",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "TotalCopies",
                table: "Books");

            migrationBuilder.RenameColumn(
                name: "PublishDate",
                table: "Books",
                newName: "PublicationDate");
        }
    }
}
