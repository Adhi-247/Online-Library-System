namespace backend.Models;

public class Book
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public string Isbn { get; set; } = string.Empty;
    public string Publisher { get; set; } = string.Empty;
    public DateTime? PublishDate { get; set; }
    public int Pages { get; set; }
    public string Description { get; set; } = string.Empty;
    public string CoverImage { get; set; } = string.Empty;
    public int TotalCopies { get; set; } = 1;
    public int Available { get; set; } = 1;
    
    // Foreign key for Category
    public int? CategoryId { get; set; }
    public Category? Category { get; set; }
}
