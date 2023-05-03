using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.EntityFrameworkCore;
using RatingTime.API.Authentication;
using RatingTime.API.Middlewares.Exceptions;
using RatingTime.API.Options;
using RatingTime.DataAccess;
using RatingTime.Domain.Models;
using RatingTime.DTO.Models.Users;
using RatingTime.Logic.Users;
using RatingTime.Logic.Users.Impl;
using RatingTime.Validation.Users;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string MY_REACT_CORS_POLICY = "my-react-origin";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MY_REACT_CORS_POLICY,
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

builder.Services.AddSingleton<ExceptionHandlingMiddleware>();
builder.Services.AddSingleton<IAuthService, AuthService>();
builder.Services.AddTransient<IUserLogic, UserLogic>();
builder.Services.AddTransient<UserValidator>();
builder.Services.AddAutoMapper(typeof(UserLogin).Assembly);

builder.Services.AddControllers(options => {
    options.Conventions.Add(new RouteTokenTransformerConvention(new SlugifyParameterTransformer()));    //nece putanja kontrolera biti MovieRating nego movie-rating npr.
    options.ReturnHttpNotAcceptable = true;
    })
                .AddXmlDataContractSerializerFormatters()
                .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<RatingTimeContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options => {
        options.LoginPath = "/api/authentication/login";
        options.ExpireTimeSpan = TimeSpan.FromDays(7);
        options.Cookie.Name = "auth-cookie";
        options.Cookie.SameSite = SameSiteMode.Strict;
        options.Events.OnRedirectToLogin = context =>
        {
            context.Response.Headers.Location = context.RedirectUri;
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
        options.Events.OnRedirectToAccessDenied = context =>
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        };
        });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("User", policy => policy.RequireAuthenticatedUser());
    options.AddPolicy("Admin", policy => policy.RequireRole(UserRole.Admin.ToString()));
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

app.UseCors(MY_REACT_CORS_POLICY);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
