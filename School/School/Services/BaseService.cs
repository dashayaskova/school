using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Models;
using MongoDB.Bson;

namespace School.Services
{
    public abstract class BaseService<T>
    {
        protected IMongoCollection<T> _collection;
        protected IMongoDatabase _database;

        public BaseService(ISchoolDatabaseSettings settings) {
            var client = new MongoClient(settings.ConnectionString);
            _database = client.GetDatabase(settings.DatabaseName);
        }

        protected FilterDefinition<T> idFilter(string id) 
            => Builders<T>.Filter.Eq("_id", ObjectId.Parse(id));

        public T GetById(string id) =>
            _collection.Find(idFilter(id)).FirstOrDefault();
        
        public List<T> Get(FilterDefinition<T> filter) =>
            _collection.Find(filter).ToList();
        
        public List<T> GetList() =>
            _collection.Find(el => true).ToList();
        
        public T Get() =>
            _collection.Find(el => true).First();

        public void Add(T classObj) =>
            _collection.InsertOne(classObj);
        
        public bool Delete(string id)
            =>  _collection.DeleteOne(idFilter(id)).DeletedCount == 1; 
        
        public DeleteResult Delete(FilterDefinition<T> filter) =>
            _collection.DeleteMany(filter);
    }
}