using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using School.GraphTypes;
using System.Linq;

namespace School.Models
{
    public class Params
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string CurrentYear { get; set; }
        public List<string> Years { get; set; }
    }
}