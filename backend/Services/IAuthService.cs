using backend.Models;
using System.Threading.Tasks;

namespace backend.Services
{
    public interface IAuthService
    {
        Task<User> AuthenticateAsync(string username, string password);
        Task<User> RegisterAsync(User user);
    }
}
