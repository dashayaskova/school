using GraphQL.Types;
using School.Models;
using School.Services;
using MongoDB.Bson;
using System.Collections.Generic;

namespace School.GraphTypes
{
    public class GradeSpaceType : ObjectGraphType<GradeSpace>
    {
        public GradeSpaceType(SubjectService ss)
        {
            Field("Id", x => x.Id, type: typeof(IdGraphType));
            Field("Date", x => x.Date, type: typeof(DateGraphType));
            Field("Name", x => x.Name);
            Field("Type", x => x.Type);
            Field<SubjectType>("Subject",
                resolve: context =>
                {
                    return ss.GetById(context.Source.Subject.ToString());
                });
        }
    }
}