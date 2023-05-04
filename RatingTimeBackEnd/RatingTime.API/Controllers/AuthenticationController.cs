using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RatingTime.API.Authentication;
using RatingTime.Domain.Enums;
using RatingTime.Domain.Models;
using RatingTime.DTO.Models.Users;
using RatingTime.Logic.Users;
using RatingTime.Validation.Users;

namespace RatingTime.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserLogic userLogic;
        private readonly IMapper mapper;
        private readonly UserValidator userValidator;
        private readonly IAuthService authenticationService;

        public AuthenticationController(IUserLogic userLogic, IMapper mapper, UserValidator userValidator, IAuthService authenticationService)
        {
            this.userLogic = userLogic;
            this.mapper = mapper;
            this.userValidator = userValidator;
            this.authenticationService = authenticationService;
        }

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status200OK), ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> RegisterAsync([FromBody] UserRegister userRegister)
        {
            var user = mapper.Map<User>(userRegister);

            var validationResult = await userValidator.ValidateAsync(user);
            if (validationResult.IsValid == false)
            {
                return BadRequest(new { Errors = validationResult.Errors.Select(e => e.ErrorMessage) });
            }

            await userLogic.SaveAsync(user);
            await authenticationService.LoginAsync(user, HttpContext);

            return Ok(new { message = "The user is registered and logged in.", role = UserRole.User.ToString() });
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK), ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> LoginAsync(CancellationToken cancellationToken, [FromBody] UserLogin userLogin)
        {
            var user = mapper.Map<User>(userLogin);

            var dbUser = await userLogic.GetUserAndCheckPasswordAsync(user, cancellationToken);
            await authenticationService.LoginAsync(dbUser, HttpContext);

            return Ok(new { message = "The user is logged in.", role = dbUser.Role.ToString() });
        }

        [HttpPost("logout")]
        [ProducesResponseType(StatusCodes.Status200OK), ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> LogoutAsync()
        {
            await authenticationService.LogoutAsync(HttpContext);
            return Ok(new { message = "The user is logged out." });
        }
    }
}
