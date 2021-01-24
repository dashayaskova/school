using MongoDB.Bson;
using System.Collections.Generic;

namespace School.Models
{
    [BsonCollection("Classes")]
    public class Class : Document
    {
        public string Name { get; set; }
        public List<ObjectId> Students { get; set; }
        public string Year { get; set; }
    }
}