using MongoDB.Bson;

namespace School.Models
{
    [BsonCollection("Subjects")]
    public class Subject : Document
    {
        public string Name { get; set; }

        public ObjectId Class { get; set; }
    }
}