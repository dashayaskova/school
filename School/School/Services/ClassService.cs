using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Models;

namespace School.Services
{
    public class ClassService
    {
        private readonly IMongoCollection<Class> _classes;

        public ClassService(ISchoolDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _classes = database.GetCollection<Class>("Classes");
        }

        public List<Class> Get(FilterDefinition<Class> filter) =>
            _classes.Find(filter).ToList();
        
        public List<Class> Get() =>
            _classes.Find(classObj => true).ToList();
        
        public void AddClass(Class classObj) =>
            _classes.InsertOne(classObj);
    }
}