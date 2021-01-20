using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Models;
using School.GraphTypes;
using MongoDB.Bson;

namespace School.Services
{
    public class GradeSpaceService : BaseService<GradeSpace>
    {
        public GradeSpaceService(ISchoolDatabaseSettings settings) : base(settings)
        {
            _collection = _database.GetCollection<GradeSpace>("GradeSpaces");
        }

        public List<GradeSpace> GetBySubjectId(string subjectId) {
            return Get(Builders<GradeSpace>.Filter.Eq("Subject", ObjectId.Parse(subjectId)));
        }

        public GradeSpace EditGradeSpace(string id, GradeSpaceInput gsi) {
            var grade = _collection.Find(idFilter(id)).First();
            grade.Date = gsi.Date;
            grade.Name = gsi.Name;
            grade.Type = gsi.Type;
            _collection.ReplaceOne(idFilter(id), grade);
            return grade;
        }

        public void DeleteBySubject(ObjectId subId) {
            Delete(Builders<GradeSpace>.Filter.Eq("Subject", subId));
        }
    }
}