using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;


namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : Controller
    {
        // Ideally you would use a database, but this is fine for now
        private readonly List<Vehicle> _vehicles = new List<Vehicle>();

        public VehicleController()
        {
            // Get all vehicles
            _vehicles = LoadVehiclesJson();
        }

        private List<Vehicle> LoadVehiclesJson()
        {
            using (StreamReader reader = new StreamReader("Sample Data/vehicles.json"))
            {
                string vehicles_json = reader.ReadToEnd();
                List<Vehicle> vehicles = Newtonsoft.Json.JsonConvert.DeserializeObject<List<Vehicle>>(vehicles_json);
                Console.WriteLine(vehicles.ToString());
                return vehicles;
            }
        }

        // Just keeping this here for messing around
        [HttpGet("static/")]
        public Vehicle Get()
        {
            return new Vehicle
            {
                GUID = new Guid("c417a7a3-4508-4e7d-9189-d8df6641dd71"),
                Make = new string("Lincoln"),
                Model = new string("MKT"),
                Year = 2011,
                Vin = new string("1B3AZ6JZ7AV721867"),
                Trim = new string("LSX"),
            };
        }

        // According to quick google search List is the goto over Array since you dont have to handle resizing
        // In the scope I wouldn't have to resize... but I'll still use list

        // Get all vehicles on initial load
        [HttpGet("api/[controller]")]
        public List<Vehicle> Index()
        {
            return _vehicles;
        }
    }
}
