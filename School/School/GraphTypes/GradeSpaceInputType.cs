using GraphQL.Types;
using System;

namespace School.GraphTypes
{
    public class GradeSpaceInput
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public string Subject { get; set; }
        public string Type { get; set; }
    }
    
    public class GradeSpaceInputType : InputObjectGraphType<GradeSpaceInput>
    {
        public GradeSpaceInputType()
        {
            Name = "GradeSpaceInput";
            Field(x => x.Id, nullable: true);
            Field(x => x.Name);
            Field(x => x.Date);
            Field(x => x.Subject, nullable: true);
            Field(x => x.Type);
        }
    }
}