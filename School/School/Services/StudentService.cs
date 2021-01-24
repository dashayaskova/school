using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using School.Repository;
using School.Models;
using School.GraphTypes;
using MongoDB.Bson;

namespace School.Services
{
    public class StudentService : BaseService<Student>
    {
        public StudentService(BaseRepository<Student> studentRepository)
            : base(studentRepository) { }

        public IEnumerable<Student> GetBySurname(string surname) {
            return _baseRepository.Get(Builders<Student>.Filter.Eq("Surname", surname));
        }

        public Student Add(StudentInput studentInput)
        {
            var student = new Student()
            {
                Birthday = studentInput.Birthday,
                Email = studentInput.Email,
                Name = studentInput.Name,
                Patronymic = studentInput.Patronymic,
                Phone = studentInput.Phone,
                RegistryId = studentInput.RegistryId,
                Surname = studentInput.Surname
            };

            _baseRepository.Add(student);
            return student;
        }

        public Student Edit(string id, StudentInput studentInput)
        {
            var student = _baseRepository.GetById(id);
            student.Birthday = studentInput.Birthday;
            student.Email = studentInput.Email;
            student.Name = studentInput.Name;
            student.Patronymic = studentInput.Patronymic;
            student.Phone = studentInput.Phone;
            student.Surname = studentInput.Surname;
            student.RegistryId = studentInput.RegistryId;
            return _baseRepository.Edit(id, student);
        }
    }
}
