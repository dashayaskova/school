using MongoDB.Bson;
using System;

namespace School.Models
{
    [BsonCollection("GradeSpaces")]
    public class GradeSpace : Document
    {
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public ObjectId Subject { get; set; }
        public ObjectId Class { get; set; }
        public string Type { get; set; }
    }
}