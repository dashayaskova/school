using GraphQL.Types;
using System;

namespace School.GraphTypes
{
    public class StudentInput
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public string RegistryId { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime Birthday { get; set; }
    }
    
    public class StudentInputType : InputObjectGraphType<StudentInput>
    {
        public StudentInputType()
        {
            Name = "StudentInput";
            Field(x => x.Name);
            Field(x => x.Surname);
            Field(x => x.Patronymic);
            Field(x => x.Birthday);
            Field(x => x.Email);
            Field(x => x.Phone);
            Field(x => x.RegistryId);
        }
    }
}