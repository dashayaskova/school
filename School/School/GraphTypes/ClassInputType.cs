using GraphQL.Types;
using System.Collections.Generic;
using MongoDB.Bson;

namespace School.GraphTypes
{
    public class ClassInput
    {
        public string Name { get; set; }
        public string Year { get; set; }
    }
    
    public class ClassInputType : InputObjectGraphType<ClassInput>
    {
        public ClassInputType()
        {
            Name = "ClassInput";
            Field(x => x.Name);
            Field(x => x.Year);
        }
    }
}