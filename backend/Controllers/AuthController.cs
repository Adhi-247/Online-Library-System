using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.DTOs;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly LibraryContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(LibraryContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // =========================
        // USER REGISTER
        // =========================
        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto registerDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                return BadRequest(new AuthResponseDto
                {
                    Success = false,
                    Message = "Email already registered"
                });
            }

            var user = new User
            {
                FullName = registerDto.FullName,
                Email = registerDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                Role = "Member",
                MemberSince = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = GenerateUserJwtToken(user);

            return Ok(new AuthResponseDto
            {
                Success = true,
                Message = "Registration successful",
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    Role = user.Role
                }
            });
        }

        // =========================
        // USER LOGIN
        // =========================
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (user == null ||
                !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            {
                return Unauthorized(new AuthResponseDto
                {
                    Success = false,
                    Message = "Invalid email or password"
                });
            }

            var token = GenerateUserJwtToken(user);

            return Ok(new AuthResponseDto
            {
                Success = true,
                Message = "Login successful",
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    Role = user.Role
                }
            });
        }

        // =========================
        // ADMIN LOGIN (SEPARATE TABLE)
        // =========================
        [HttpPost("admin/login")]
        public async Task<ActionResult<AuthResponseDto>> AdminLogin(LoginDto loginDto)
        {
            var admin = await _context.Admins
                .FirstOrDefaultAsync(a => a.Email == loginDto.Email);

            if (admin == null ||
                !BCrypt.Net.BCrypt.Verify(loginDto.Password, admin.Password))
            {
                return Unauthorized(new AuthResponseDto
                {
                    Success = false,
                    Message = "Invalid admin credentials"
                });
            }

            var token = GenerateAdminJwtToken(admin);

            return Ok(new AuthResponseDto
            {
                Success = true,
                Message = "Admin login successful",
                Token = token,
                User = new UserDto
                {
                    Id = admin.Id,
                    FullName = admin.FullName,
                    Email = admin.Email,
                    Role = "Admin"
                }
            });
        }

        // =========================
        // JWT FOR USER
        // =========================
        private string GenerateUserJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]!)
            );

            var credentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256
            );

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    int.Parse(jwtSettings["ExpirationInMinutes"] ?? "60")
                ),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // =========================
        // JWT FOR ADMIN
        // =========================
        private string GenerateAdminJwtToken(Admin admin)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]!)
            );

            var credentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256
            );

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, admin.Id.ToString()),
                new Claim(ClaimTypes.Email, admin.Email),
                new Claim(ClaimTypes.Name, admin.FullName),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    int.Parse(jwtSettings["ExpirationInMinutes"] ?? "60")
                ),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
