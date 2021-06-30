using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System;
using System.Threading.Tasks;

namespace api.Models
{
    public class VehicleContext : DbContext
    {
        public VehicleContext(DbContextOptions<VehicleContext> options) : base(options)
        {
        }

        //public DbSet<VehicleContext> Vehicles { get; set; }

        public async Task<List<Vehicle>> Vehicles()
        {
            using (StreamReader reader = new StreamReader("Data/vehicles.json"))
            {
                string vehicles_json = await reader.ReadToEndAsync();
                List<Vehicle> _vehicles = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Vehicle>>(vehicles_json);
                Console.WriteLine("Deserialized the json file.");

                return _vehicles;
            }
        }
    }
}
