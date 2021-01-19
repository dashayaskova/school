using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Models;
using School.GraphTypes;
using MongoDB.Bson;

namespace School.Services
{
    public class StudentService : BaseService<Student>
    {
        public StudentService(ISchoolDatabaseSettings settings):base(settings)
        {
            _collection = _database.GetCollection<Student>("Students");
        }

        public List<Student> GetStudentsBySurname(string surname) {
            return Get(Builders<Student>.Filter.Eq("Surname", surname));
        }

        public Student EditStudent(string id, StudentInput ct) {
            var s = _collection.Find(idFilter(id)).First();
            s.Birthday = ct.Birthday;
            s.Email = ct.Email;
            s.Name = ct.Name;
            s.Patronymic = ct.Patronymic;
            s.Phone = ct.Phone;
            s.Surname = ct.Surname;
            s.RegistryId = ct.RegistryId;
            _collection.ReplaceOne(idFilter(id), s);
            return s;
        }
    }
}