using System.Security.Claims;
using GraphQL.Server.Ui.Voyager;
using GraphQL.Validation;
using GraphQL.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using GraphQL;
using School.Services;
using School.GraphQL;
using School.GraphTypes;
using School.Models;
using School.Repository;

namespace School
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IDependencyResolver>(
                s => new FuncDependencyResolver(s.GetRequiredService));

            services.Configure<SchoolDatabaseSettings>(
                Configuration.GetSection(nameof(SchoolDatabaseSettings)));

            services.AddSingleton<ISchoolDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<SchoolDatabaseSettings>>().Value);

            services.AddSingleton<IAuthorizationEvaluator, AuthorizationEvaluator>();
            services.AddTransient<IValidationRule, AuthorizationValidationRule>();

            services.AddSingleton(s =>
            {
                var authSettings = new AuthorizationSettings();

                authSettings.AddPolicy("AdminPolicy", 
                  _ => _.RequireClaim(ClaimTypes.Role, "Admin"));
                authSettings.AddPolicy("TeacherPolicy", 
                  _ => _.RequireClaim(ClaimTypes.Role, "Teacher"));
                authSettings.AddPolicy("AdminOrTeacherPolicy", 
                  _ => _.RequireClaim(ClaimTypes.Role, new[] { "Teacher", "Admin" }));

                return authSettings;
            });

            services.AddSingleton<BaseRepository<User>>();
            services.AddSingleton<BaseRepository<Class>>();
            services.AddSingleton<BaseRepository<Student>>();
            services.AddSingleton<BaseRepository<Subject>>();
            services.AddSingleton<BaseRepository<Grade>>();
            services.AddSingleton<BaseRepository<GradeSpace>>();
            services.AddSingleton<BaseRepository<Params>>();
            services.AddSingleton<ParamsService>();
            services.AddSingleton<UserService>();
            services.AddSingleton<ClassService>();
            services.AddSingleton<StudentService>();
            services.AddSingleton<GradeSpaceService>();
            services.AddSingleton<GradeService>();
            services.AddSingleton<SubjectService>();
            services.AddSingleton<ParamsService>();
            services.AddSingleton<UserType>();
            services.AddSingleton<ClassType>();
            services.AddSingleton<ClassSubjectsType>();
            services.AddSingleton<StudentType>();
            services.AddSingleton<ParamsType>();
            services.AddSingleton<SubjectType>();
            services.AddSingleton<GradeSpaceType>();
            services.AddSingleton<GradeType>();
            services.AddSingleton<ClassSubjectsInputType>();
            services.AddSingleton<UserInputType>();
            services.AddSingleton<ClassInputType>();
            services.AddSingleton<StudentInputType>();
            services.AddSingleton<GradeSpaceInputType>();
            services.AddSingleton<GradeInputType>();
            services.AddSingleton<SubjectInputType>();
            services.AddSingleton<Query>();
            services.AddSingleton<Mutation>();
            services.AddSingleton<SchoolSchema>();
            services.AddControllers().AddNewtonsoftJson();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHttpsRedirection();
            }

            app
            .UseCors("MyPolicy")
            .UseWebSockets()
            .UseGraphQLVoyager(new GraphQLVoyagerOptions() {})
            .UseGraphiQLServer()
            .UseGraphQLPlayground("/");

            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
