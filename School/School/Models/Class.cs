using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace School.Models
{
    public class Class
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
    }
}