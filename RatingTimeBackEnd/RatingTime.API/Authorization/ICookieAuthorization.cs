namespace RatingTime.API.Authorization
{
    public interface ICookieAuthorization
    {
        public const string AUTHORIZATION_COOKIE_NAME = "auth-cookie";
        public const string AUTHORIZATION_POLICY_USER = "User";
        public const string AUTHORIZATION_POLICY_ADMIN = "Admin";
    }
}
