using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Models;
using School.GraphTypes;
using MongoDB.Bson;

namespace School.Services
{
    public class GradeService : BaseService<Grade>
    {
        public GradeService(ISchoolDatabaseSettings settings) : base(settings)
        {
            _collection = _database.GetCollection<Grade>("Grades");
        }

        public List<Grade> GetByGradeSpaces(IEnumerable<string> gradeSpaces)
        {
            return Get(Builders<Grade>.Filter.In("GradeSpace",
                gradeSpaces.Select(j => ObjectId.Parse(j)).ToList()));
        }

        public void AddRange(IEnumerable<Grade> grades)
        {
            if (grades.Count() != 0)
                _collection.InsertMany(grades);
        }

        public IEnumerable<Grade> EditRange(IEnumerable<Grade> grades)
        {

            if (grades.Count() == 0)
            {
                return new List<Grade>();
            }

            var updates = new List<WriteModel<Grade>>();

            foreach (var doc in grades)
            {
                var filterDefinition = Builders<Grade>.Filter.Eq(p => p.Id, doc.Id);
                var updateDefinition = Builders<Grade>.Update.Set(p => p.Mark, doc.Mark);
                updates.Add(new UpdateOneModel<Grade>(filterDefinition, updateDefinition));
            }
            _collection.BulkWrite(updates, new BulkWriteOptions() { IsOrdered = false });

            return Get(Builders<Grade>.Filter.In("Id", grades.Select(g => ObjectId.Parse(g.Id))));
        }

        public void RemoveRange(IEnumerable<string> gradeIds)
        {
            if (gradeIds.Count() != 0) {
                _collection.DeleteMany(
                    Builders<Grade>.Filter.In("Id", gradeIds.Select(g => ObjectId.Parse(g))));
            }
        }

        public void RemoveByGradeSpace(string id) {
            _collection.DeleteMany(
                Builders<Grade>.Filter.Eq("GradeSpace", ObjectId.Parse(id)));
        }
    }
}
