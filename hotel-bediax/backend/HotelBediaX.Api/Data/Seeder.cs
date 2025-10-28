// genera datos falsos con faker

using Bogus;
using HotelBediaX.Api.Models;

namespace HotelBediaX.Api.Data
{
    public static class Seeder
    {
        public static void Seed (AppDbContext db, int count = 2000000)
        {
            if (db.Destinations.Any()) return;

            var faker = new Faker<Destination>("es")
                .RuleFor(d => d.Id, f => Guid.NewGuid())
                .RuleFor(d => d.Name, f => f.Company.CompanyName())
                .RuleFor(d => d.Country, f => f.Address.Country())
                .RuleFor(d => d.City, f => f.Address.City())
                .RuleFor(d => d.Description, f => f.Lorem.Sentence(10))
                .RuleFor(d => d.PricePerNight, f => Math.Round(f.Random.Decimal(20, 1000), 2))
                .RuleFor(d => d.CreatedAt, faker => faker.Date.Past(2).ToUniversalTime());

            //para insertar en batchs
            const int batch = 5000;
            var toInsert = new List<Destination>(batch);
            for (int i = 0; i < count; i++)
            {
                toInsert.Add(faker.Generate());
                if (toInsert.Count >= batch)
                {
                    db.Destinations.AddRange(toInsert);
                    db.SaveChanges();
                    toInsert.Clear();
                }
            }
            if (toInsert.Count > 0)
            {
                db.Destinations.AddRange(toInsert);
                db.SaveChanges();
            }
        }
    }
}