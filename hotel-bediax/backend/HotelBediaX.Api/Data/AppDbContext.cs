// define el contesxto de ef core y la tabla destinations. representa la base de datos y sus entidades.

using Microsoft.EntityFrameworkCore;
using HotelBediaX.Api.Models;

namespace HotelBediaX.Api.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet <Destination> Destinations { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}