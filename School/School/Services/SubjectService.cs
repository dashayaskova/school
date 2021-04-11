using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Repository;
using School.Models;
using School.GraphTypes;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;

namespace School.Services
{
    public class SubjectService : BaseService<Subject>
    {
        public GradeSpaceService _gradeSpaceService;
        public SubjectService(BaseRepository<Subject> subjectRepository,
         GradeSpaceService gradeSpaceService)
            : base(subjectRepository) {
                _gradeSpaceService = gradeSpaceService;
             }

        public IEnumerable<Subject> GetByClassId(string classId) {
            return _baseRepository.Get(
                Builders<Subject>.Filter.Eq("Class", ObjectId.Parse(classId)));
        }

        public IEnumerable<Subject> GetBySurname(string surname) {
            return _baseRepository.Get(Builders<Subject>.Filter.Eq("Surname", surname));
        }

        public Subject Add(SubjectInput subjectInput)
        {
            var subject = new Subject()
            {
                Name = subjectInput.Name,
                Class = ObjectId.Parse(subjectInput.Class),
            };

            _baseRepository.Add(subject);
            return subject;
        }

        public Subject Edit(string id, SubjectInput subjectInput)
        {
            var subject = _baseRepository.GetById(id);
            subject.Name = subjectInput.Name;
            subject.Class = ObjectId.Parse(subjectInput.Class);
            return _baseRepository.Edit(id, subject);
        }

        public List<Grade> GetGradeReport(string classId, string studentId)
        {
            var pipeline = new []{
                new BsonDocument("$match", new BsonDocument("Class", ObjectId.Parse(classId))),
                new BsonDocument("$lookup", new BsonDocument
                    {
                        { "from", "GradeSpaces" },
                        { "localField", "_id" },
                        { "foreignField", "Subject" },
                        { "as", "gss" }
                    }),
                new BsonDocument("$addFields", new BsonDocument("gss", new BsonDocument("$filter", new BsonDocument
                    {
                        { "input", "$gss" },
                        { "as", "gs" },
                        { "cond", new BsonDocument("$ne", new BsonArray { "$$gs.Type", "usual"}) }
                    }))),
                new BsonDocument("$lookup", new BsonDocument
                    {
                        { "from", "Grades" },
                        { "localField", "gss._id" },
                        { "foreignField", "GradeSpace" },
                        { "as", "grades" }
                    }),
                new BsonDocument("$addFields", new BsonDocument("grades", new BsonDocument("$filter", new BsonDocument
                    {
                        { "input", "$grades" },
                        { "as", "g" },
                        { "cond", new BsonDocument("$eq", new BsonArray { "$$g.Student", ObjectId.Parse(studentId)}) }
                    }))),
                new BsonDocument("$match", new BsonDocument("grades", new BsonDocument
                    {{ "$exists", true }, { "$not", new BsonDocument("$size", 0) } })),
                new BsonDocument("$project", new BsonDocument("gss", 0))
            };
            
            var list = _baseRepository.Aggregate(pipeline).ToList();
            var result = list.SelectMany(doc => doc["grades"].AsBsonArray.Select(val => val.AsBsonDocument));
            return result.Select(gd => BsonSerializer.Deserialize<Grade>(gd)).ToList(); 
        }

        public override bool Delete(string id)
        {
            var res = _baseRepository.Delete(id);
            _gradeSpaceService.DeleteBySubject(id);
            return res.DeletedCount == 1;
        }

        public bool DeleteByClass(string id)
        {
            var res = _baseRepository.Delete(
                Builders<Subject>.Filter.Eq("Class", ObjectId.Parse(id)));
            _gradeSpaceService.DeleteByClass(id);
            return res.DeletedCount == 1;
        }
    }
}
