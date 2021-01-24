using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using School.GraphTypes;
using System.Linq;

namespace School.Models
{
    [BsonCollection("Subjects")]
    public class Subject : Document
    {
        public string Name { get; set; }

        public ObjectId Class { get; set; }
    }
}