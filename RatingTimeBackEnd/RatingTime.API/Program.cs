using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.EntityFrameworkCore;
using RatingTime.API.Options;
using RatingTime.DataAccess;
using RatingTime.DTO.Models.Users;
using RatingTime.Logic.Users;
using RatingTime.Logic.Users.Impl;
using RatingTime.Validation.Users;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string myReactOrigin = "myReactOrigin";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myReactOrigin,
                      policy =>
                      {
                          policy
                          //.AllowAnyOrigin()
                          .WithOrigins("http://localhost:3000")
                          .WithOrigins("http://127.0.0.1:3000")
                          .WithOrigins("http://172.25.192.1:3000")
                          .AllowAnyMethod()
                          //.WithMethods("POST", "GET", "OPTIONS")
                          .AllowAnyHeader()
                          .AllowCredentials();
                      });
});

builder.Services.AddDataProtection();

builder.Services.AddTransient<IUserLogic, UserLogic>();
builder.Services.AddTransient<UserValidator>();
builder.Services.AddAutoMapper(typeof(UserLogin).Assembly);

builder.Services.AddControllers(options => {
    options.Conventions.Add(new RouteTokenTransformerConvention(new SlugifyParameterTransformer()));
    options.ReturnHttpNotAcceptable = true;
    })
                .AddXmlDataContractSerializerFormatters()
                .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<RatingTimeContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

//builder.Services.AddAuthentication("cookie");

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
} else if (app.Environment.IsProduction())
{
    app.Services.GetService<ILoggerFactory>().AddFile(builder.Configuration["Logging:LogFile:Path"].ToString());
}

app.UseHttpsRedirection();

app.UseCors(myReactOrigin);

app.UseAuthorization();

//app.MapGet("/username", (HttpContext context) =>
//    context.Request.Headers.Cookie.FirstOrDefault()
//);

//app.MapGet("/login", (HttpContext context) =>
//{
//    context.Response.Headers.SetCookie = "auth=usr:djordjo";
//    return "ok";
//});

app.MapControllers();

app.Run();
