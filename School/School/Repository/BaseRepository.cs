using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Models;
using MongoDB.Bson;
using System;

namespace School.Repository
{
    public class BaseRepository<T> where T : Document
    {
        protected IMongoCollection<T> _collection;
        protected IMongoDatabase _database;

        public BaseRepository(ISchoolDatabaseSettings settings)
        {
            _database = new MongoClient(settings.ConnectionString).GetDatabase(settings.DatabaseName);
            _collection = _database.GetCollection<T>(GetCollectionName(typeof(T)));
        }

        private protected string GetCollectionName(Type documentType)
        {
            var o_arr = documentType.GetCustomAttributes(typeof(BsonCollectionAttribute), true);
            var o = o_arr.FirstOrDefault();
            var bca = (School.BsonCollectionAttribute)o;
            return bca?.CollectionName;
            // return (documentType
            //         .GetCustomAttributes(typeof(BsonCollectionAttribute), true)
            //         .FirstOrDefault()).ToString();
        }

        protected FilterDefinition<T> idFilter(string id)
            => Builders<T>.Filter.Eq("_id", ObjectId.Parse(id));

        public T GetById(string id) =>
            _collection.Find(idFilter(id)).FirstOrDefault();

        public IEnumerable<T> Get(FilterDefinition<T> filter) =>
            _collection.Find(filter).ToList();

        public List<T> Get() =>
            _collection.Find(el => true).ToList();

        public T GetFirst() =>
            _collection.Find(el => true).First();

        public void Add(T entity) =>
            _collection.InsertOne(entity);

        public void AddRange(IEnumerable<T> entities) =>
            _collection.InsertMany(entities);

        public T Edit(string id, T entity)
        {
            _collection.ReplaceOne(idFilter(id), entity);
            return entity;
        }

        public void Edit(List<WriteModel<T>> updates) {
            _collection.BulkWrite(updates, new BulkWriteOptions() { IsOrdered = false });
        }

        public DeleteResult Delete(string id)
            => _collection.DeleteOne(idFilter(id));

        public DeleteResult Delete(FilterDefinition<T> filter) =>
            _collection.DeleteMany(filter);

        public IAsyncCursor<BsonDocument> Aggregate(BsonDocument[] pipeline) =>
            _collection.Aggregate<BsonDocument>(pipeline);
    }
}