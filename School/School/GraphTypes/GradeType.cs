using GraphQL.Types;
using School.Models;
using School.Services;
using MongoDB.Bson;
using System.Collections.Generic;

namespace School.GraphTypes
{
    public class GradeType : ObjectGraphType<Grade>
    {
        public GradeType(StudentService ss, GradeSpaceService gsp)
        {
            Field("Id", x => x.Id, type: typeof(IdGraphType));
            Field("Mark", x => x.Mark);
            Field<StudentType>("Student",
                resolve: context =>
                {
                    return ss.GetById(context.Source.Student.ToString());
                });
            Field<GradeSpaceType>("GradeSpace",
                resolve: context =>
                {
                    return gsp.GetById(context.Source.GradeSpace.ToString());
                });   
        }
    }
}