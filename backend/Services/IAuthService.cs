using backend.Models;

namespace backend.Services
{
    public interface IAuthService
    {
        Task<User?> AuthenticateAsync(string email, string password);
        Task<User> RegisterAsync(User user);
    }
}
