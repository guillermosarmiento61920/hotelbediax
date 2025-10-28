// Program.cs configura los servicios, CORS, Swagger Db y arranca el servidor.
// Configuración inicial de la API y registro de dependencias

using HotelBediaX.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("HotelBediaXDb"));

// Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowDev", policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowDev");

// Configurar HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    Seeder.Seed(db, 200000);
}

app.UseAuthorization();
app.MapControllers();
app.Run();