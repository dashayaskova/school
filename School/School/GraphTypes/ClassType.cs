using GraphQL.Types;
using School.Models;
using School.Services;
using System.Collections.Generic;

namespace School.GraphTypes
{
     public class ClassType : ObjectGraphType<Class>
    {
        public ClassType(StudentService sc, UserService us, SubjectService ss)
        {
            Field("Id", x => x.Id, type: typeof(NonNullGraphType<IdGraphType>));
            Field("Name", x => x.Name);
            Field("Year", x => x.Year);
            Field<NonNullGraphType<ListGraphType<NonNullGraphType<StudentType>>>>(
                "Students",
                resolve: context => {
                    return sc.GetByIds(context.Source.Students);
                }
            );
            Field<NonNullGraphType<ListGraphType<NonNullGraphType<SubjectType>>>>(
                "Subjects",
                resolve: context => {
                    return ss.GetByClassId(context.Source.Id.ToString());
                }
            );
        }
    }
}