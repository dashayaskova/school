using GraphQL.Types;

namespace School.GraphTypes
{
    public class SubjectInput
    {
        public string Name { get; set; }
        public string Class { get; set; }
    }
    
    public class SubjectInputType : InputObjectGraphType<SubjectInput>
    {
        public SubjectInputType()
        {
            Name = "SubjectInput";
            Field(x => x.Name);
            Field(x => x.Class);
        }
    }
}