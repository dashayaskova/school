using System.Collections.Generic;

namespace School.Models
{
    [BsonCollection("Params")]
    public class Params : Document
    {
        public string CurrentYear { get; set; }
        public List<string> Years { get; set; }
    }
}