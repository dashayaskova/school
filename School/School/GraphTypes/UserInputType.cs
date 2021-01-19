using GraphQL.Types;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Linq;

namespace School.GraphTypes
{
    public class UserInput
    {
        public string Name { get; set; }
        public bool IsAdmin { get; set; }
        public string Email { get; set; }
        public List<ClassSubjectsInput> ClassAccess { get; set; }
        public string Uid { get; set; }
    }
    
    public class UserInputType : InputObjectGraphType<UserInput>
    {
        public UserInputType()
        {
            Name = "UserInput";
            Field(x => x.Name);
            Field(x => x.IsAdmin);
            Field(x => x.ClassAccess, type: typeof(ListGraphType<ClassSubjectsInputType>));
            Field(x => x.Email);
            Field(x => x.Uid);
        }
    }

    public class ClassSubjectsInput
    {
        public string ClassId { get; set; }
        public List<string> SubjectAccess { get; set; }
    }

    public class ClassSubjectsInputType : InputObjectGraphType<ClassSubjectsInput>
    {
        public ClassSubjectsInputType()
        {
            Name = "ClassSubjectsInput";
            Field(x => x.ClassId);
            Field(x => x.SubjectAccess);
        }
    }
}