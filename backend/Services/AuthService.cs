using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly LibraryContext _context;

        public AuthService(LibraryContext context)
        {
            _context = context;
        }

        public async Task<User?> AuthenticateAsync(string email, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        }

        public async Task<User> RegisterAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
