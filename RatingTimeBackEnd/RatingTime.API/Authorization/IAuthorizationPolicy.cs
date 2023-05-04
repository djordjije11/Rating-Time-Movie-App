namespace RatingTime.API.Authorization
{
    public interface IAuthorizationPolicy
    {
        public const string AUTHORIZATION_POLICY_USER = "User";
        public const string AUTHORIZATION_POLICY_ADMIN = "Admin";
    }
}
