using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleController : ControllerBase
    {
        [HttpGet]
        public Vechicle Get()
        {
            return new Vechicle
            {
                GUID = new Guid("c417a7a3-4508-4e7d-9189-d8df6641dd71"),
                Make = new string("Lincoln"),
                Model = new string("MKT"),
                Year = 2011,
                Vin = new string("1B3AZ6JZ7AV721867"),
                Trim = new string("LSX"),
            };
        }
    }
}
