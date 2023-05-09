using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RatingTime.API.Authorization;
using RatingTime.Domain.Models;
using RatingTime.DTO.Models.Ratings;
using RatingTime.Logic.Movies;
using RatingTime.Logic.Ratings;
using System.Security.Claims;

namespace RatingTime.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = IAuthorizationPolicy.AUTHORIZATION_POLICY_USER)]
    public class RatingController : ControllerBase
    {
        private readonly IRatingLogic ratingLogic;
        private readonly IMovieLogic movieLogic;
        private readonly IMapper mapper;
        private readonly IValidator<Rating> ratingValidator;
        private readonly IValidator<Movie> movieValidator;

        public RatingController(IRatingLogic ratingLogic, IMovieLogic movieLogic, IMapper mapper, IValidator<Rating> ratingValidator, IValidator<Movie> movieValidator)
        {
            this.ratingLogic = ratingLogic;
            this.movieLogic = movieLogic;
            this.mapper = mapper;
            this.ratingValidator = ratingValidator;
            this.movieValidator = movieValidator;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK), ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<RatingInfo>>> GetAllAsync(CancellationToken cancellationToken)
        {
            int userId = int.Parse(this.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var userRatings = mapper.Map<List<RatingInfo>>(await ratingLogic.GetAllByUserAsync(userId, cancellationToken));
            return Ok(userRatings);
        }

        [HttpGet("{username}"), Authorize(Policy = IAuthorizationPolicy.AUTHORIZATION_POLICY_ADMIN)]
        [ProducesResponseType(StatusCodes.Status200OK), ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<List<RatingInfo>>> GetAllByUsernameAsnyc(CancellationToken cancellationToken, [FromRoute] string username)
        {
            return Ok(mapper.Map<List<RatingInfo>>(await ratingLogic.GetAllByUserAsync(username, cancellationToken)));
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK), ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SaveAsync([FromBody] RatingPost ratingPost)
        {
            var rating = mapper.Map<Rating>(ratingPost);
            rating.UserId = int.Parse(this.User.FindFirstValue(ClaimTypes.NameIdentifier));
            var movie = rating.Movie;
            var movieValidationResult = await movieValidator.ValidateAsync(movie);
            if (movieValidationResult.IsValid == true)
            {
                await movieLogic.SaveAsync(movie);
            }

            var ratingValidationResult = await ratingValidator.ValidateAsync(rating);
            if (ratingValidationResult.IsValid == false)
            {
                return BadRequest(new { Errors = ratingValidationResult.Errors.Select(e => e.ErrorMessage) });
            }

            await ratingLogic.SaveAsync(rating);
            return Ok(new { message = "Rating is saved." });
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK), ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteAsync([FromBody] RatingDelete ratingDelete)
        {
            var rating = mapper.Map<Rating>(ratingDelete);
            rating.UserId = int.Parse(this.User.FindFirstValue(ClaimTypes.NameIdentifier));

            await ratingLogic.DeleteAsync(rating);

            return Ok(new { message = "Rating is deleted." });
        }
    }
}
