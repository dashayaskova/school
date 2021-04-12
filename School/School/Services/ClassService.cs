using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Repository;
using School.Models;
using School.GraphTypes;
using MongoDB.Bson;

namespace School.Services
{
    public class ClassService : BaseService<Class>
    {
        public SubjectService _subjectService;
        public GradeSpaceService _gradeSpaceService;
        public GradeService _gradeService;
        public ClassService(BaseRepository<Class> classRepository, 
            SubjectService subjectService,
            GradeSpaceService gradeSpaceService,
            GradeService gradeService)
            : base(classRepository) {
                _subjectService = subjectService;
                _gradeSpaceService = gradeSpaceService;
                _gradeService = gradeService;
             }

        public Class Add(ClassInput classInput)
        {
            var classObj = new Class()
            {
                Name = classInput.Name,
                Year = classInput.Year,
                Students = new List<ObjectId>()
            };

            _baseRepository.Add(classObj);
            return classObj;
        }

        public Class AddStudent(string id, List<string> students) {
            var classDb = _baseRepository.GetById(id);
            classDb.Students.AddRange(students.Select(e => ObjectId.Parse(e)));
            _baseRepository.Edit(id, classDb);
            return classDb;
        }

        public bool RemoveStudent(string id, string studentId) {
            var classDb = _baseRepository.GetById(id);
            classDb.Students.Remove(ObjectId.Parse(studentId));
            _baseRepository.Edit(id, classDb);
            var gradeSpaces = _gradeSpaceService.GetByClass(id);
            _gradeService.DeleteByGradeSpacesAndStudent(
              gradeSpaces.Select(e => ObjectId.Parse(e.Id)), studentId);
            return true;
        }

        public Class Edit(string id, ClassInput classInput)
        {
            var classObj = _baseRepository.GetById(id);
            classObj.Name = classInput.Name;
            classObj.Year = classInput.Year;
            return _baseRepository.Edit(id, classObj);
        }

        public override bool Delete(string id)
        {
            var res = _baseRepository.Delete(id);
            _subjectService.DeleteByClass(id);
            return res.DeletedCount == 1;
        }
    }
}
