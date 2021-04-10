using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace School.Models
{
    [BsonCollection("Users")]
    public class User : Document
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public bool IsAdmin { get; set; }

        public string Uid { get; set; }

        public List<ClassSubjects> ClassAccess { get; set; }
    }

    public class ClassSubjects {
        [BsonIgnore]
        public Class Class { get; set; }
        public ObjectId ClassId { get; set; }
        public List<ObjectId> SubjectAccess { get; set; }
    }
}