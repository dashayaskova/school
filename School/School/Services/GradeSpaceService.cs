using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Models;
using School.GraphTypes;
using MongoDB.Bson;
using School.Repository;

namespace School.Services
{
    public class GradeSpaceService : BaseService<GradeSpace>
    {
        public GradeService _gradeService;
        public GradeSpaceService(BaseRepository<GradeSpace> gradeSpaceRepository,
            GradeService gradeService) :
            base(gradeSpaceRepository)
        {
            _gradeService = gradeService;
        }

        public IEnumerable<GradeSpace> GetBySubjectId(string subjectId)
        {
            return _baseRepository.Get(
                Builders<GradeSpace>.Filter.Eq("Subject", ObjectId.Parse(subjectId)));
        }

        public IEnumerable<GradeSpace> GetByClass(string id)
        {
            return _baseRepository.Get(Builders<GradeSpace>.Filter.Eq("Class", ObjectId.Parse(id)));
        }

        public GradeSpace Add(GradeSpaceInput s)
        {
            var gradeSpace = new GradeSpace()
            {
                Name = s.Name,
                Date = s.Date,
                Type = s.Type,
                Subject = ObjectId.Parse(s.Subject),
                Class = ObjectId.Parse(s.Class)
            };
            _baseRepository.Add(gradeSpace);
            return gradeSpace;
        }

        public GradeSpace Edit(string id, GradeSpaceInput gsi)
        {
            var gradeSpace = _baseRepository.GetById(id);
            gradeSpace.Date = gsi.Date;
            gradeSpace.Name = gsi.Name;
            gradeSpace.Type = gsi.Type;
            _baseRepository.Edit(id, gradeSpace);
            return gradeSpace;
        }

        public override bool Delete(string id) {
            var res = _baseRepository.Delete(Builders<GradeSpace>.Filter.Eq("Id", id));
            _gradeService.DeleteByGradeSpace(id);
            return res.DeletedCount != 0;
        }

        public void DeleteBySubject(string subId)
        {
            var ids = GetBySubjectId(subId);
            _baseRepository.Delete(Builders<GradeSpace>.Filter.Eq("Subject", subId));
            _gradeService.DeleteByGradeSpaces(ids.Select(e => ObjectId.Parse(e.Id)));
        }

        public void DeleteByClass(string id)
        {
            var gardeSpacesIds = GetByClass(id).Select(o => ObjectId.Parse(o.Id));
            _baseRepository.Delete(Builders<GradeSpace>.Filter.In("Id", gardeSpacesIds));
            _gradeService.DeleteByGradeSpaces(gardeSpacesIds);
        }
    }
}