namespace backend.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Role { get; set; } = "Member"; // Admin, Member, Librarian
    public DateTime MemberSince { get; set; } = DateTime.UtcNow;
    public string Avatar { get; set; } = string.Empty;
}
