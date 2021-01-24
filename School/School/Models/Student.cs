using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace School.Models
{
    [BsonCollection("Students")]
    public class Student : Document
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public DateTime Birthday { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string RegistryId { get; set; }
    }
}