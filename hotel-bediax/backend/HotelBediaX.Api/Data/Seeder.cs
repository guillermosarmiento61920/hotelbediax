// genera datos falsos con faker
using Bogus;
using HotelBediaX.Api.Models;
using System.Collections.Generic;
using System.Linq;

namespace HotelBediaX.Api.Data
{
    public static class Seeder
    {
        public static void Seed (AppDbContext db, int count = 2000000)
        {
            if (db.Destinations.Any()) return;

            var types = new[] { "beach", "mountain", "city", "island", "rural", "adventure" };

            var faker = new Faker<Destination>("es")
                .RuleFor(d => d.Id, f => Guid.NewGuid())
                .RuleFor(d => d.Name, f => f.Company.CompanyName())
                .RuleFor(d => d.Country, f => f.Address.Country())
                .RuleFor(d => d.City, f => f.Address.City())
                .RuleFor(d => d.Description, f => f.Lorem.Sentence(10))
                .RuleFor(d => d.Type, f => f.PickRandom(types))
                .RuleFor(d => d.PricePerNight, f => Math.Round(f.Random.Decimal(20, 1000), 2))
                .RuleFor(d => d.CreatedAt, faker => faker.Date.Past(2).ToUniversalTime())
                 .RuleFor(d => d.LastModified, f => f.Date.Recent(30).ToUniversalTime());

            //para insertar en batchs
            const int batch = 5000;
            var buffer = new List<Destination>(batch);
            for (int i = 0; i < count; i++)
            {
                buffer.Add(faker.Generate());
                if (buffer.Count >= batch)
                {
                    db.Destinations.AddRange(buffer);
                    db.SaveChanges();
                    buffer.Clear();
                }
            }
            if (buffer.Count > 0)
            {
                db.Destinations.AddRange(buffer);
                db.SaveChanges();
            }
        }
    }
}