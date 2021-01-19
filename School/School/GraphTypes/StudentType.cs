using GraphQL.Types;
using School.Models;
using School.Services;
using System.Collections.Generic;
using MongoDB.Driver;

namespace School.GraphTypes
{
     public class StudentType : ObjectGraphType<Student>
    {
        public StudentType(StudentService cs)
        {
            Field("Id", x => x.Id, type: typeof(IdGraphType));
            Field("Surname", x => x.Surname);
            Field("Name", x => x.Name);
            Field("Patronymic", x => x.Patronymic);
            Field("Birthday", x => x.Birthday, type: typeof(DateGraphType));
            Field("RegistryId", x => x.RegistryId);
            Field("Phone", x => x.Phone);
            Field("Email", x => x.Email);
        }
    }
}