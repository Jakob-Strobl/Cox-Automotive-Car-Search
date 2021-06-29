using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api
{
    public class Vechicle
    {
        // "id" field from json
        public Guid GUID { get; set; }

        public string Make { get; set; }

        public string Model { get; set; }

        public int Year { get; set; }

        public string Vin { get; set; }

        public string Trim { get; set; }
    }
}
