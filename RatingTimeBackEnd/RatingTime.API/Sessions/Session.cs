namespace RatingTime.API.Sessions
{
    public  class Session
    {
        public const string REFRESH_TOKEN_KEY = "refresh-token";

        public Dictionary<string, string> UsersAuthenticationTokens = new();
    }
}
