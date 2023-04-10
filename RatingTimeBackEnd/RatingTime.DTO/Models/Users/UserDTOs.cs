﻿using RatingTime.DTO.Models.Ratings;
using System.Runtime.Serialization;

namespace RatingTime.DTO.Models.Users
{
    public record UserLogin(string? Username, string? Email, string Password);
    public record UserRegister(string Username, string Email, string Password);
    [DataContract]
    public record UserInfo([property: DataMember] string Username, [property: DataMember] string Email);
    public record UserDetailInfo(string Username, string Email, List<UserRatingInfo> Ratings);
}