using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Models;

namespace School.Services
{
    public class ParamsService : BaseService<Params>
    {
        public ParamsService(ISchoolDatabaseSettings settings) : base(settings)
        {
            _collection = _database.GetCollection<Params>("Params");
        }
    }
}