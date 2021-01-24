using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace School.Models
{

    public abstract class Document
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
    }
}