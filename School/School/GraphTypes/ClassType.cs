using GraphQL.Types;
using School.Models;
using School.Services;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Collections.Generic;

namespace School.GraphTypes
{
     public class ClassType : ObjectGraphType<Class>
    {
        public ClassType(StudentService sc, UserService us, SubjectService ss)
        {
            Field("Id", x => x.Id, type: typeof(IdGraphType));
            Field("Name", x => x.Name);
            Field("Year", x => x.Year, nullable: true);
            Field<ListGraphType<StudentType>>(
                "Students",
                resolve: context => {
                    if (context.Source.Students != null) {
                        return sc.GetByIds(context.Source.Students);
                    } else {
                        return new List<Student>();
                    }
                }
            );

            Field<ListGraphType<SubjectType>>(
                "Subjects",
                resolve: context => {
                    return ss.GetByClassId(context.Source.Id.ToString());
                }
            );
        }
    }
}