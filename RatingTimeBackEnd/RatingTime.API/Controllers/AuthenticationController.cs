﻿using AutoMapper;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RatingTime.API.Options;
using RatingTime.Domain.Models;
using RatingTime.DTO.Models.Users;
using RatingTime.Logic.Users;
using RatingTime.Validation.Users;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RatingTime.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly IUserLogic userLogic;
        private readonly IMapper mapper;
        private readonly IDataProtectionProvider dataProtection;
        private readonly UserValidator userValidator;

        public AuthenticationController(IConfiguration configuration, IUserLogic userLogic, IMapper mapper, IDataProtectionProvider dataProtection, UserValidator userValidator)
        {
            this.configuration = configuration;
            this.userLogic = userLogic;
            this.mapper = mapper;
            this.dataProtection = dataProtection;
            this.userValidator = userValidator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] UserRegister userRegister)
        {
            var user = mapper.Map<User>(userRegister);

            var validationResult = await userValidator.ValidateAsync(user);
            if (validationResult.IsValid == false)
            {
                return BadRequest(new { Errors = validationResult.Errors.Select(e => e.ErrorMessage) });
            }

            try
            {
                await userLogic.RegisterAsync(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok("The user is registered.");
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> LoginAsync([FromBody] UserLogin userLogin)
        {
            var user = mapper.Map<User>(userLogin);

            User loggedInUser;

            try
            {
                loggedInUser = await userLogic.LoginAsync(user);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }

            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration[MyConfig.CONFIG_AUTH_SECRET]));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claimsForToken = new List<Claim>()
                {
                    new Claim("sub", loggedInUser.Id.ToString()),
                    new Claim("name", loggedInUser.Username),
                    new Claim("email", loggedInUser.Email)
                };
            var jwtSecurityToken = new JwtSecurityToken(configuration[MyConfig.CONFIG_AUTH_ISSUER], configuration[MyConfig.CONFIG_AUTH_AUDIENCE], claimsForToken, DateTime.UtcNow, DateTime.UtcNow.AddDays(1), signingCredentials);
            var tokenToReturn = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

            return Ok(tokenToReturn);
        }
    }
}
