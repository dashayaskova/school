using GraphQL.Types;
using School.Models;
using School.Services;

namespace School.GraphTypes
{
     public class SubjectType : ObjectGraphType<Subject>
    {
        public SubjectType(ClassService cs, GradeSpaceService gss)
        {
            Field("Id", x => x.Id, type: typeof(NonNullGraphType<IdGraphType>));
            Field("Name", x => x.Name);
            Field<NonNullGraphType<ClassType>>("Class",
                resolve: context => cs.GetById(context.Source.Class.ToString()));
            Field<NonNullGraphType<ListGraphType<NonNullGraphType<GradeSpaceType>>>>(
                "GradeSpaces",
                resolve: context => {
                        return gss.GetBySubjectId(context.Source.Id);
                });
        }
    }
}