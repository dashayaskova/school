using GraphQL.Types;

namespace School.GraphTypes
{
    public class GradeInput
    {
        public string Id { get; set; }
        public int Mark { get; set; }
        public string Student { get; set; }
        public string GradeSpace { get; set; }
    }
    
    public class GradeInputType : InputObjectGraphType<GradeInput>
    {
        public GradeInputType()
        {
            Name = "GradeInput";
            Field(x => x.Id, nullable: true);
            Field(x => x.Mark);
            Field(x => x.Student, nullable: true);
            Field(x => x.GradeSpace, nullable: true);
        }
    }
}