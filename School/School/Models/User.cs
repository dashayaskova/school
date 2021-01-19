using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using School.GraphTypes;
using System.Linq;

namespace School.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public bool IsAdmin { get; set; }

        public string Uid { get; set; }

        public List<ClassSubjects> ClassAccess { get; set; }

        public User() {}
        
        public void Update(UserInput ui)
        {
            Name = ui.Name;
            IsAdmin = ui.IsAdmin;
            ClassAccess = ui.ClassAccess.Select(i => new ClassSubjects() {
                ClassId = ObjectId.Parse(i.ClassId),
                SubjectAccess = i.SubjectAccess.Select(j => ObjectId.Parse(j)).ToList()
            }).ToList();
        }
    }

    public class ClassSubjects {
        [BsonIgnore]
        public Class Class { get; set; }
        public ObjectId ClassId { get; set; }
        public List<ObjectId> SubjectAccess { get; set; }
    }
}