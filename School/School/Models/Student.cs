using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace School.Models
{
    public class Student
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string FIO { get; set; }

        public string Birthday { get; set; }
    }
}