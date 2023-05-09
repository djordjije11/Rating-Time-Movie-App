using RatingTime.Logic.Exceptions;

namespace RatingTime.API.Middlewares.Exceptions
{
    public class ExceptionHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<ExceptionHandlingMiddleware> logger;

        public ExceptionHandlingMiddleware(ILogger<ExceptionHandlingMiddleware> logger)
        {
            this.logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            switch (exception)
            {
                case LogicException:
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    return context.Response.WriteAsJsonAsync(new { exception.Message });
                case OperationCanceledException:
                    logger.LogInformation(exception, $"{DateTime.Now}: {ToString()}\nMessage: {exception.Message}");
                    context.Response.StatusCode = StatusCodes.Status404NotFound;
                    return context.Response.WriteAsJsonAsync(new { message = "The action is canceled." });
                case Exception:
                    logger.LogCritical(exception, $"{DateTime.Now}: {ToString()}\nMessage: {exception.Message}");
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    return context.Response.WriteAsJsonAsync(new { message = "The action is not done successfully." });
                default:
                    logger.LogCritical(exception, $"{DateTime.Now}: {ToString()}\nMessage: {exception.Message}");
                    context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    return context.Response.WriteAsJsonAsync(new { message = "The action is not done successfully." });
            }
        }
    }
}
