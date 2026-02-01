using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    // In-memory list to store books
    private static List<Book> _books = new List<Book>
    {
        new Book { Id = 1, Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", Isbn = "978-0743273565", PublicationDate = new DateTime(1925, 4, 10) },
        new Book { Id = 2, Title = "To Kill a Mockingbird", Author = "Harper Lee", Isbn = "978-0446310789", PublicationDate = new DateTime(1960, 7, 11) },
        new Book { Id = 3, Title = "1984", Author = "George Orwell", Isbn = "978-0451524935", PublicationDate = new DateTime(1949, 6, 8) }
    };

    private static int _nextId = 4;

    // GET: api/Books
    [HttpGet]
    public ActionResult<IEnumerable<Book>> GetBooks()
    {
        return Ok(_books);
    }

    // GET: api/Books/5
    [HttpGet("{id}")]
    public ActionResult<Book> GetBook(int id)
    {
        var book = _books.FirstOrDefault(b => b.Id == id);
        if (book == null)
        {
            return NotFound();
        }
        return Ok(book);
    }

    // POST: api/Books
    [HttpPost]
    public ActionResult<Book> CreateBook(Book book)
    {
        book.Id = _nextId++;
        _books.Add(book);
        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
    }

    // PUT: api/Books/5
    [HttpPut("{id}")]
    public IActionResult UpdateBook(int id, Book book)
    {
        var existingBook = _books.FirstOrDefault(b => b.Id == id);
        if (existingBook == null)
        {
            return NotFound();
        }

        existingBook.Title = book.Title;
        existingBook.Author = book.Author;
        existingBook.Isbn = book.Isbn;
        existingBook.PublicationDate = book.PublicationDate;

        return NoContent();
    }

    // DELETE: api/Books/5
    [HttpDelete("{id}")]
    public IActionResult DeleteBook(int id)
    {
        var book = _books.FirstOrDefault(b => b.Id == id);
        if (book == null)
        {
            return NotFound();
        }

        _books.Remove(book);
        return NoContent();
    }
}
