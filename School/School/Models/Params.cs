using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using School.GraphTypes;
using System.Linq;

namespace School.Models
{
    [BsonCollection("Params")]
    public class Params : Document
    {
        public string CurrentYear { get; set; }
        public List<string> Years { get; set; }
    }
}