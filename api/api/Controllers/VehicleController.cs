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

        public VehicleController(VehicleContext vehicles)
        {
            // Get all vehicles
            _vehicles = vehicles;
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

        // According to quick google search List is the goto over Array since you dont have to handle resizing
        // In the scope I wouldn't have to resize... but I'll still use list

        // Returns all vehicles
        // GET api/vehicle/all
        [HttpGet("all")]
        public async Task<ActionResult<List<Vehicle>>> Index()
        {
            return await _vehicles.Vehicles();
        }

        // Returns all vehicles
        // GET api/vehicle/{number}
        [HttpGet("{number}")]
        public async Task<ActionResult<List<Vehicle>>> GetNumberOfVehicles(int? number)
        {
            Console.WriteLine(number);
            if (number.HasValue)
            {
                List<Vehicle> vehicles = await _vehicles.Vehicles();
                return vehicles.GetRange(0, number.Value);
            }
            else
            {
                List<Vehicle> vehicles = await _vehicles.Vehicles();
                return vehicles.GetRange(0, 10);
            }
        }
    }
}
