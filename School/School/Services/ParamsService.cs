using School.Models;
using School.Repository;

namespace School.Services
{
    public class ParamsService : BaseService<Params>
    {
        public ParamsService(BaseRepository<Params> paramsRepository) :
            base(paramsRepository)
        {}
    }
}