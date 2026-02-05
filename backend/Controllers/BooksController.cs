using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly LibraryContext _context;

    public BooksController(LibraryContext context)
    {
        _context = context;
    }

    // GET: api/Books
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
    {
        return await _context.Books.Include(b => b.Category).ToListAsync();
    }

    // GET: api/Books/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> GetBook(int id)
    {
        var book = await _context.Books
            .Include(b => b.Category)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (book == null)
        {
            return NotFound();
        }
        return book;
    }

    // GET: api/Books/category/5
    [HttpGet("category/{categoryId}")]
    public async Task<ActionResult<IEnumerable<Book>>> GetBooksByCategory(int categoryId)
    {
        return await _context.Books
            .Where(b => b.CategoryId == categoryId)
            .Include(b => b.Category)
            .ToListAsync();
    }

    // GET: api/Books/search?query=gatsby
    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Book>>> SearchBooks([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return await _context.Books.Include(b => b.Category).ToListAsync();
        }

        var lowercaseQuery = query.ToLower();
        return await _context.Books
            .Include(b => b.Category)
            .Where(b => b.Title.ToLower().Contains(lowercaseQuery) ||
                       b.Author.ToLower().Contains(lowercaseQuery) ||
                       b.Isbn.ToLower().Contains(lowercaseQuery))
            .ToListAsync();
    }

    // POST: api/Books
    [HttpPost]
    public async Task<ActionResult<Book>> CreateBook(Book book)
    {
        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
    }

    // PUT: api/Books/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBook(int id, Book book)
    {
        if (id != book.Id)
        {
            return BadRequest();
        }

        _context.Entry(book).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!BookExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/Books/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            return NotFound();
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool BookExists(int id)
    {
        return _context.Books.Any(e => e.Id == id);
    }
}
