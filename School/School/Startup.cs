using GraphQL.Server.Ui.Playground;
using GraphQL.Server.Ui.Voyager;
using GraphQL.Server.Ui.GraphiQL;
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


namespace School
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddSingleton<IDependencyResolver>(
				s => new FuncDependencyResolver(s.GetRequiredService)
			);
			services.Configure<SchoolDatabaseSettings>(
        		Configuration.GetSection(nameof(SchoolDatabaseSettings)));

    		services.AddSingleton<ISchoolDatabaseSettings>(sp =>
        		sp.GetRequiredService<IOptions<SchoolDatabaseSettings>>().Value);

			services.AddSingleton<UserService>();
			services.AddSingleton<ClassService>();
			services.AddSingleton<StudentService>();
			services.AddSingleton<ParamsService>();
			services.AddSingleton<SubjectService>();
			services.AddSingleton<GradeSpaceService>();
			services.AddSingleton<GradeService>();
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
			services.AddSingleton<Query>();
			services.AddSingleton<Mutation>();
			services.AddSingleton<SchoolSchema>();
			services.AddControllers().AddNewtonsoftJson();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
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
			.UseGraphQLVoyager(new GraphQLVoyagerOptions() { Path = "/voyager" })
			.UseGraphiQLServer(new GraphiQLOptions() { Path = "/"});

			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}
	}
}
