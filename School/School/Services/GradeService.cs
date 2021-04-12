using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Repository;
using School.Models;
using School.GraphTypes;
using MongoDB.Bson;

namespace School.Services
{
    public class GradeService : BaseService<Grade>
    {
        public GradeService(BaseRepository<Grade> gradeRepository) : base(gradeRepository)  {
         }

        public IEnumerable<Grade> Add(IEnumerable<GradeInput> gradesInput)
        {
            var grades = gradesInput.Select(e => new Grade()
            {
                Mark = e.Mark,
                GradeSpace = ObjectId.Parse(e.GradeSpace),
                Student = ObjectId.Parse(e.Student),
            });

            if (grades.Count() != 0)
                _baseRepository.AddRange(grades);

            return grades;
        }

        public IEnumerable<Grade> GetByGradeSpaces(IEnumerable<GradeSpace> gradeSpaces)
        {
            return _baseRepository.Get(Builders<Grade>.Filter.In("GradeSpace",
                gradeSpaces.Select(j => ObjectId.Parse(j.Id)).ToList()));
        }

        public IEnumerable<Grade> GetReport(ObjectId studentId, IEnumerable<ObjectId> gradeSpaces) {
            var filter = Builders<Grade>.Filter.In("GradeSpace", gradeSpaces) &
                Builders<Grade>.Filter.Ne("Type", "usual") &
                Builders<Grade>.Filter.Eq("Student", studentId);
            return _baseRepository.Get(filter);
        }

        public IEnumerable<Grade> Edit(List<GradeInput> gradesInput)
        {
            if (gradesInput.Count() == 0)
            {
                return new List<Grade>();
            }

            var grades = gradesInput.Select(e => new Grade()
            {
                Id = e.Id,
                Mark = e.Mark,
            }).ToList();
            
            var updates = new List<WriteModel<Grade>>();

            foreach (var doc in grades)
            {
                var filterDefinition = Builders<Grade>.Filter.Eq(p => p.Id, doc.Id);
                var updateDefinition = Builders<Grade>.Update.Set(p => p.Mark, doc.Mark);
                updates.Add(new UpdateOneModel<Grade>(filterDefinition, updateDefinition));
            }
            
            _baseRepository.Edit(updates);

            return _baseRepository.Get(Builders<Grade>.Filter.In("Id", grades.Select(g => ObjectId.Parse(g.Id))));
        }

        public bool Delete(IEnumerable<string> gradeIds)
        {
            if (gradeIds.Count() != 0) {
                var res = _baseRepository.Delete(
                    Builders<Grade>.Filter.In("Id", gradeIds.Select(g => ObjectId.Parse(g))));

                return res.DeletedCount != 0;
            }

            return true;
        }
        
        public void DeleteByGradeSpacesAndStudent(IEnumerable<ObjectId> ids, string studentId) {
            _baseRepository.Delete(Builders<Grade>.Filter.In("GradeSpace", ids) &
              Builders<Grade>.Filter.Eq("Student", ObjectId.Parse(studentId)));
        }

        public void DeleteByGradeSpace(string id) {
            _baseRepository.Delete(Builders<Grade>.Filter.Eq("GradeSpace", ObjectId.Parse(id)));
        }

        public void DeleteByStudent(string id) {
            _baseRepository.Delete(Builders<Grade>.Filter.Eq("Student", ObjectId.Parse(id)));
        }

        public void DeleteByGradeSpaces(IEnumerable<ObjectId> ids) {
            _baseRepository.Delete(Builders<Grade>.Filter.In("GradeSpace", ids));
        }
    }
}
