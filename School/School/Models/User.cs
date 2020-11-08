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

        public List<ObjectId> ClassAccess { get; set; }

        public User() {}
        
        public void Update(UserInput ui)
        {
            Name = ui.Name;
            IsAdmin = ui.IsAdmin;
            ClassAccess = ui.ClassAccess.Select(i => ObjectId.Parse(i)).ToList();
        }
    }
    
}