using GraphQL.Types;
using School.Models;
using School.Services;

namespace School.GraphTypes
{
    public class GradeSpaceType : ObjectGraphType<GradeSpace>
    {
        public GradeSpaceType(SubjectService ss)
        {
            Field("Id", x => x.Id, type: typeof(NonNullGraphType<IdGraphType>));
            Field("Date", x => x.Date, type: typeof(NonNullGraphType<DateGraphType>));
            Field("Name", x => x.Name);
            Field("Type", x => x.Type);
            Field<NonNullGraphType<SubjectType>>("Subject",
                resolve: context =>
                {
                    return ss.GetById(context.Source.Subject.ToString());
                });
        }
    }
}