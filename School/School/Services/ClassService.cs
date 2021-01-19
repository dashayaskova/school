using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Models;
using School.GraphTypes;
using MongoDB.Bson;

namespace School.Services
{
    public class ClassService : BaseService<Class>
    {
        public ClassService(ISchoolDatabaseSettings settings) : base(settings)
        {
            _collection = _database.GetCollection<Class>("Classes");
        }

        public Class EditClass(string id, ClassInput ct) {
            var classDb = _collection.Find(idFilter(id)).First();
            classDb.Name = ct.Name;
            classDb.Year = ct.Year;
            // classDb.CurrentTeacher = ObjectId.Parse(ct.CurrentTeacher);
            _collection.ReplaceOne(idFilter(id), classDb);
            return classDb;
        }

        public Class AddStudent(string id, List<string> students) {
            var classDb = _collection.Find(idFilter(id)).First();
            classDb.Students.AddRange(students.Select(e => ObjectId.Parse(e)));
            _collection.ReplaceOne(idFilter(id), classDb);
            return classDb;
        }

        public bool RemoveStudent(string id, string studentId) {
            var classDb = _collection.Find(idFilter(id)).First();
            classDb.Students.Remove(ObjectId.Parse(studentId));
            return _collection.ReplaceOne(idFilter(id), classDb).ModifiedCount == 1;
        }
    }
}