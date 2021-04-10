using MongoDB.Bson;

namespace School.Models
{
    [BsonCollection("Grades")]
    public class Grade : Document
    {
        public int Mark { get; set; }
        public ObjectId Student { get; set; }
        public ObjectId GradeSpace { get; set; }
    }
}