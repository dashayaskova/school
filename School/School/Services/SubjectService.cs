using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Models;
using School.GraphTypes;
using MongoDB.Bson;

namespace School.Services
{
    public class SubjectService : BaseService<Subject>
    {
        public SubjectService(ISchoolDatabaseSettings settings):base(settings)
        {
            _collection = _database.GetCollection<Subject>("Subjects");
        }

        public List<Subject> GetByClassId(string classId) {
            return Get(Builders<Subject>.Filter.Eq("Class", ObjectId.Parse(classId)));
        }
        
        public Subject EditSubject(string id, SubjectInput si) {
            var s = _collection.Find(idFilter(id)).First();
            s.Name = si.Name;
            s.Class = ObjectId.Parse(si.Class);
            _collection.ReplaceOne(idFilter(id), s);
            return s;
        }
    }
}