using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RatingTime.API.Middlewares.Exceptions;
using RatingTime.API.Options;
using RatingTime.API.Sessions;
using RatingTime.DataAccess;
using RatingTime.DTO.Models.Users;
using RatingTime.Logic.Users;
using RatingTime.Logic.Users.Impl;
using RatingTime.Validation.Users;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string MY_REACT_POLICY = "my-react-origin";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MY_REACT_POLICY,
                      policy =>
                      {
                          policy
                          .AllowAnyOrigin()
                          //.WithOrigins("http://localhost:3000")
                          //.WithOrigins("http://127.0.0.1:3000")
                          //.WithOrigins("http://172.25.192.1:3000")
                          .AllowAnyMethod()
                          //.WithMethods("POST", "GET", "OPTIONS")
                          .AllowAnyHeader();
                          //.AllowCredentials();
                      });
});

builder.Services.AddDataProtection();

builder.Services.AddSingleton<Session>();
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
builder.Services.AddAuthentication("Bearer")
                .AddJwtBearer(options =>
                    options.TokenValidationParameters = new()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration[MyConfig.CONFIG_AUTH_ISSUER],
                        ValidAudience = builder.Configuration[MyConfig.CONFIG_AUTH_AUDIENCE],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration[MyConfig.CONFIG_AUTH_SECRET]))
                    }
                );

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("User", policy => policy.RequireAuthenticatedUser());
    options.AddPolicy("Admin", policy => policy.RequireRole("admin"));
});


var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    IConfigurationSection configLogFileSection = app.Configuration.GetSection("Logging").GetSection("LogFile");
    if (configLogFileSection.GetValue<bool>("Include") == true)
    {
        app.Services.GetService<ILoggerFactory>().AddFile(configLogFileSection.GetValue<string>("Path"));
    }
}

app.UseHttpsRedirection();

app.UseCors(MY_REACT_POLICY);

app.UseAuthentication();

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
