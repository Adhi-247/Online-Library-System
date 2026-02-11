using backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services
{
    public class BookService : IBookService
    {
        private readonly LibraryContext _context;

        public BookService(LibraryContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Book>> GetAllBooksAsync()
        {
            return _context.Books.ToList();
        }

        public async Task<Book> GetBookByIdAsync(int id)
        {
            return _context.Books.FirstOrDefault(b => b.Id == id);
        }

        public async Task AddBookAsync(Book book)
        {
            _context.Books.Add(book);
            _context.SaveChanges();
        }

        public async Task UpdateBookAsync(Book book)
        {
            _context.Books.Update(book);
            _context.SaveChanges();
        }

        public async Task DeleteBookAsync(int id)
        {
            var book = _context.Books.FirstOrDefault(b => b.Id == id);
            if (book != null)
            {
                _context.Books.Remove(book);
                _context.SaveChanges();
            }
        }
    }
}
