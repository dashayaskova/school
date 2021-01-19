using GraphQL.Types;
using School.Models;
using School.Services;
using MongoDB.Bson;
using System.Collections.Generic;

namespace School.GraphTypes
{
     public class SubjectType : ObjectGraphType<Subject>
    {
        public SubjectType(ClassService cs, GradeSpaceService gss)
        {
            Field("Id", x => x.Id, type: typeof(IdGraphType));
            Field("Name", x => x.Name);
            Field<ClassType>("Class",
                resolve: context => {
                    if (context.Source.Class != null) {
                        return cs.GetById(context.Source.Class.ToString());
                    } else {
                        return null;
                    }
                });
            Field<ListGraphType<GradeSpaceType>>("GradeSpaces",
                resolve: context => {
                        return gss.GetBySubjectId(ObjectId.Parse(context.Source.Id));
                });
        }
    }
}