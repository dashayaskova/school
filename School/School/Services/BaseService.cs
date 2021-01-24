using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Repository;
using School.Models;
using MongoDB.Bson;

namespace School.Services
{
    public abstract class BaseService<T> where T : Document 
    {
        public BaseRepository<T> _baseRepository;
        public BaseService(BaseRepository<T> baseRepository) {
            _baseRepository = baseRepository;
        }

        public IEnumerable<T> Get()
        {
            return _baseRepository.Get();
        }

        
        public IEnumerable<T> GetByIds(IEnumerable<ObjectId> list) {
            return _baseRepository.Get(Builders<T>.Filter.In("_id", list));
        }

        public T GetById(string id) {
            return _baseRepository.GetById(id);
        }

        public virtual bool Delete(string id)
        {
            return _baseRepository.Delete(id).DeletedCount == 1;
        }
    }
}