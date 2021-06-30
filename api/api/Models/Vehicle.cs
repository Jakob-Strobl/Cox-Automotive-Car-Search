using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Vehicle
    {
        // "id" field from json
        public Guid Id { get; set; }

        public string Make { get; set; }

        public string Model { get; set; }

        public int Year { get; set; }

        public string Vin { get; set; }

        public string Trim { get; set; }
    }
}
