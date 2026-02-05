using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend;

public class LibraryContext : DbContext
{
    public LibraryContext(DbContextOptions<LibraryContext> options)
        : base(options) { }

    public DbSet<Book> Books { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Category> Categories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Book - Category relationship
        modelBuilder.Entity<Book>()
            .HasOne(b => b.Category)
            .WithMany(c => c.Books)
            .HasForeignKey(b => b.CategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        // Seed some categories
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Fiction", Description = "Fictional literature and novels" },
            new Category { Id = 2, Name = "Science", Description = "Science and technology books" },
            new Category { Id = 3, Name = "History", Description = "Historical books and biographies" },
            new Category { Id = 4, Name = "Self-Help", Description = "Personal development and self-improvement" },
            new Category { Id = 5, Name = "Technology", Description = "Programming and IT books" }
        );
    }
}