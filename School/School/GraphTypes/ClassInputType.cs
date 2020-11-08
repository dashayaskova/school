using GraphQL.Types;

namespace School.GraphTypes
{
    public class ClassInput
    {
        public string Name { get; set; }
    }
    
    public class ClassInputType : InputObjectGraphType<ClassInput>
    {
        public ClassInputType()
        {
            Name = "ClassInput";
            Field(x => x.Name);
        }
    }
}