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
            // Field<UserType>("CurrentTeacher",
            //     resolve: context => {
            //         if (context.Source.CurrentTeacher != null) {
            //             return us.GetById(context.Source.CurrentTeacher.ToString());
            //         } else {
            //             return null;
            //         }
            //     });
            Field("Year", x => x.Year, nullable: true);
            Field<ListGraphType<StudentType>>(
                "Students",
                resolve: context => {
                    if (context.Source.Students != null) {
                        return sc.Get(Builders<Student>.Filter.In("_id", context.Source.Students));
                    } else {
                        return new List<Student>();
                    }
                }
            );

            Field<ListGraphType<SubjectType>>(
                "Subjects",
                resolve: context => {
                    return ss.Get(Builders<Subject>.Filter.Eq("Class", ObjectId.Parse(context.Source.Id)));
                }
            );
        }
    }
}