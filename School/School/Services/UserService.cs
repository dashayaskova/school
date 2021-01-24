using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Repository;
using School.Models;
using School.GraphTypes;
using MongoDB.Bson;

namespace School.Services
{
    public class UserService : BaseService<User>
    {
        public UserService(BaseRepository<User> userRepository)
            : base(userRepository) { }

        public User GetByUid(string uid) {
            return _baseRepository.Get(Builders<User>.Filter.Eq("Uid", uid)).First();
        }

        public IEnumerable<User> GetTeachers() {
            return _baseRepository.Get(Builders<User>.Filter.Eq("IsAdmin", false));
        }

        public User Add(UserInput userInput)
        {
            var user = new User()
            {
                Name = userInput.Name,
                IsAdmin = userInput.IsAdmin,
                Email = userInput.Email,
                Uid = userInput.Uid,
                ClassAccess = userInput.ClassAccess.Select(i => new ClassSubjects()
                {
                    ClassId = ObjectId.Parse(i.ClassId),
                    SubjectAccess = i.SubjectAccess.Select(j => ObjectId.Parse(j)).ToList()
                }).ToList()
            };

            _baseRepository.Add(user);
            return user;
        }

        public User Edit(string id, UserInput userInput)
        {
            var user = _baseRepository.GetById(id);
            user.Name = userInput.Name;
            user.IsAdmin = userInput.IsAdmin;
            user.ClassAccess = userInput.ClassAccess.Select(i => new ClassSubjects()
            {
                ClassId = ObjectId.Parse(i.ClassId),
                SubjectAccess = i.SubjectAccess.Select(j => ObjectId.Parse(j)).ToList()
            }).ToList();
            return _baseRepository.Edit(id, user);
        }
    }
}
