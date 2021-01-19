using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System;

namespace School.Models
{
    public class GradeSpace
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public ObjectId Subject { get; set; }
        public string Type { get; set; }
    }
}