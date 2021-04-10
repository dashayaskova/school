using GraphQL.Types;
using School.Models;
using School.Services;

namespace School.GraphTypes
{
     public class StudentType : ObjectGraphType<Student>
    {
        public StudentType(StudentService cs)
        {
            Field("Id", x => x.Id, type: typeof(NonNullGraphType<IdGraphType>));
            Field("Surname", x => x.Surname);
            Field("Name", x => x.Name);
            Field("Patronymic", x => x.Patronymic, nullable: true);
            Field("Birthday", x => x.Birthday, type: typeof(NonNullGraphType<DateGraphType>));
            Field("RegistryId", x => x.RegistryId);
            Field("Phone", x => x.Phone, nullable: true);
            Field("Email", x => x.Email, nullable: true);
        }
    }
}