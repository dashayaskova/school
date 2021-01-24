using GraphQL.Types;
using School.Models;
using School.Services;
using System.Collections.Generic;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Linq;

namespace School.GraphTypes
{
    public class UserType : ObjectGraphType<User>
    {
        public UserType(ClassService cs)
        {
            Field("Id", x => x.Id, type: typeof(IdGraphType));
            Field("Name", x => x.Name);
            Field("Email", x => x.Email);
            Field("Uid", x => x.Uid);
            Field("IsAdmin", x => x.IsAdmin);
            Field<ListGraphType<ClassSubjectsType>>(
                "ClassAccess",
                resolve: context =>
                {
                    if (context.Source.ClassAccess != null)
                    {
                        var ids = context.Source.ClassAccess.Select(e => e.ClassId).ToList();
                        var classes = cs.GetByIds(ids);
                        var joined = context.Source.ClassAccess.Join<ClassSubjects, Class, string, ClassSubjects>(
                            classes,
                            e => e.ClassId.ToString(),
                            e => e.Id,
                            (a, b) => new ClassSubjects() {
                                Class = b,
                                ClassId = a.ClassId,
                                SubjectAccess = a.SubjectAccess,
                            });
                        return joined;
                    }
                    else
                    {
                        return new List<ClassSubjects>();
                    }
                }
            );
        }
    }

    public class ClassSubjectsType : ObjectGraphType<ClassSubjects>
    {
        public ClassSubjectsType(ClassService cs, SubjectService ss)
        {
            Field<ClassType>("Class", resolve: context =>
                {
                    return context.Source.Class;
                });

            Field<ListGraphType<SubjectType>>("SubjectAccess", resolve: context =>
                {
                    return ss.GetByIds(context.Source.SubjectAccess);
                });
        }
    }
}