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
        public List<string> ClassAccess { get; set; }
        public string Uid { get; set; }
    }
    
    public class UserInputType : InputObjectGraphType<UserInput>
    {
        public UserInputType()
        {
            Name = "UserInput";
            Field(x => x.Name);
            Field(x => x.IsAdmin);
            Field(x => x.ClassAccess);
            Field(x => x.Email);
            Field(x => x.Uid);
        }
    }
}