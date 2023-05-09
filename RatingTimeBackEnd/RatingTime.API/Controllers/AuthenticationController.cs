using System.Security.Claims;
using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RatingTime.API.Authentication;
using RatingTime.API.Authorization;
using RatingTime.Domain.Enums;
using RatingTime.Domain.Models;
using RatingTime.DTO.Models.Users;
using RatingTime.Logic.Users;

namespace RatingTime.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserLogic userLogic;
        private readonly IMapper mapper;
        private readonly IValidator<User> userValidator;
        private readonly IAuthService authenticationService;

        public AuthenticationController(IUserLogic userLogic, IMapper mapper, IValidator<User> userValidator, IAuthService authenticationService)
        {
            this.userLogic = userLogic;
            this.mapper = mapper;
            this.userValidator = userValidator;
            this.authenticationService = authenticationService;
        }

        [HttpGet, Authorize(Policy = IAuthorizationPolicy.AUTHORIZATION_POLICY_USER)]
        [ProducesResponseType(StatusCodes.Status200OK), ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Check()
        {
            return Ok(new { role = User.FindFirstValue(ClaimTypes.Role) });
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
