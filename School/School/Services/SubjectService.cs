using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Models;
using MongoDB.Bson;

namespace School.Services
{
    public class SubjectService
    {
        private readonly IMongoCollection<Subject> _subjects;

        private FilterDefinition<Subject> idFilter(string id) 
            => Builders<Subject>.Filter.Eq("_id", ObjectId.Parse(id));

        public SubjectService(ISchoolDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _subjects = database.GetCollection<Subject>("Subjects");
        }

        public List<Subject> GetByClassId(string classId) {
            return Get(Builders<Subject>.Filter.Eq("Class", ObjectId.Parse(classId)));
        }

        public Subject GetById(string id) =>
            _subjects.Find(idFilter(id)).FirstOrDefault();
        
        public List<Subject> Get(FilterDefinition<Subject> filter) =>
            _subjects.Find(filter).ToList();

        public List<Subject> Get() =>
            _subjects.Find(SubjectObj => true).ToList();
        
        public void AddSubject(Subject SubjectObj) =>
            _subjects.InsertOne(SubjectObj);
        
        public bool deleteSubject(string id)
            =>  _subjects.DeleteOne(idFilter(id)).DeletedCount == 1; 
    }
}