// modelo principal. tiene todos los campos representando destino turistico

namespace HotelBediaX.Api.Models
{
    public class Destination
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = default!;
        public string Country { get; set; } = default!;
        public string City { get; set; } = default!;
        public string Description { get; set; } = default!;
        public decimal PricePerNight { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}