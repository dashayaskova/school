using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Models;
using School.GraphTypes;
using MongoDB.Bson;

namespace School.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        private FilterDefinition<User> idFilter(string id) 
            => Builders<User>.Filter.Eq("_id", ObjectId.Parse(id));

        public UserService(ISchoolDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<User>("Users");
        }

        public User Get(string uid) =>
            _users.Find(Builders<User>.Filter.Eq("Uid", uid)).FirstOrDefault();

        public User GetById(string id) =>
            _users.Find(idFilter(id)).FirstOrDefault();
        
        public List<User> Get() =>
            _users.Find(user => true).ToList();

        public void AddUser(User user) =>
            _users.InsertOne(user);

        public User EditUser(string id, UserInput ui)
        {
            var userDb = _users.Find(idFilter(id)).First();
            userDb.Update(ui);
            _users.ReplaceOne(idFilter(id), userDb);
            return userDb;
        }

        public bool DeleteUser(string id)
            =>  _users.DeleteOne(idFilter(id)).DeletedCount == 1; 

    }
}