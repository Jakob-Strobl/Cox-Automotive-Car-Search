using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using api.Models;
using System.Threading.Tasks;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : Controller
    {
        // Ideally you would use a database, but this is fine for now
        private readonly VehicleContext _vehicles = null;
        private readonly int DefaultNumberOfVehicles = 10;

        public VehicleController(VehicleContext vehicles)
        {
            // Get all vehicles
            _vehicles = vehicles;
        }

        // Returns a slice of the vehicles[0..number]
        private List<Vehicle> SliceOfVehicles(List<Vehicle> vehicles, int number)
        {
            if (vehicles.Count < number)
            {
                // Return all vehicles
                return vehicles;
            }
            else
            {
                return vehicles.GetRange(0, number);
            }
        }

        // Returns a List of all vehicles that match the query
        private List<Vehicle> QueryAllVehicles(List<Vehicle> vehicles, string query)
        {
            // Case insensitive search
            query = query.ToLower();
            return vehicles.FindAll(
                delegate (Vehicle vehicle)
                {
                    string make = (vehicle.Make ?? "").ToLower();
                    string model = (vehicle.Model ?? "").ToLower();
                    string year = vehicle.Year.ToString();
                    string vin = (vehicle.Vin ?? "").ToLower();
                    string trim = (vehicle.Trim ?? "").ToLower();

                    return make.Contains(query)
                        || model.Contains(query)
                        || year.Contains(query)
                        || vin.Contains(query)
                        || trim.Contains(query);
                }
            );
        }

        // Just keeping this here for messing around
        // GET api/vehicle/static
        [HttpGet("static")]
        public Vehicle Get()
        {
            return new Vehicle
            {
                Id = new Guid("c417a7a3-4508-4e7d-9189-d8df6641dd71"),
                Make = new string("Lincoln"),
                Model = new string("MKT"),
                Year = 2011,
                Vin = new string("1B3AZ6JZ7AV721867"),
                Trim = new string("LSX"),
            };
        }

        // Returns all vehicles
        // GET api/vehicle/all
        [HttpGet("all")]
        public async Task<ActionResult<List<Vehicle>>> All()
        {
            return await _vehicles.Vehicles();
        }

        // GET api/vehicle/{number}/{query}
        [HttpGet("all/{query}")]
        public async Task<ActionResult<List<Vehicle>>> QueryAllVehicles(string query)
        {
            List<Vehicle> vehicles = await _vehicles.Vehicles();
            return QueryAllVehicles(vehicles, query);
        }

        // GET api/vehicle/{number}
        [HttpGet("{number}")]
        public async Task<ActionResult<List<Vehicle>>> GetNumberOfVehicles(int number)
        {
            List<Vehicle> vehicles = await _vehicles.Vehicles();
            return SliceOfVehicles(vehicles, number);
        }

        // GET api/vehicle/{number}/{query}
        [HttpGet("{number}/{query}")]
        public async Task<ActionResult<List<Vehicle>>> QueryNumberOfVehicles(int number, string query)
        {
            List<Vehicle> vehicles = await _vehicles.Vehicles();
            vehicles = QueryAllVehicles(vehicles, query);
            return SliceOfVehicles(vehicles, number);
        }
    }
}
