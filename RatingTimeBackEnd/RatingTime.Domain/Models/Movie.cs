﻿using RatingTime.Domain.Relationships;
using System.ComponentModel.DataAnnotations;

namespace RatingTime.Domain.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        public int TmdbId { get; set; }
        public string Title { get; set; }
        public string? ImageUrl { get; set; }
        //public List<Rating> Ratings { get; set; } = new List<Rating>();
        public List<MovieGenre> MovieGenreList { get; set; } = new List<MovieGenre>();
    }
}
