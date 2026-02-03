using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// ✅ CORS (Angular fix)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// HTTPS
app.UseHttpsRedirection();

// ✅ CORS MUST be before MapControllers
app.UseCors("AllowAngular");

app.UseAuthorization();

app.MapControllers();

app.Run();
