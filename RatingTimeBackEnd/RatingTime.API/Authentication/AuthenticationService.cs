using Microsoft.AspNetCore.DataProtection;

namespace RatingTime.API.Authentication
{
    public class AuthenticationService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IDataProtectionProvider _dataProtectionProvider;

        public AuthenticationService(IHttpContextAccessor httpContextAccessor, IDataProtectionProvider dataProtectionProvider)
        {
            _httpContextAccessor = httpContextAccessor;
            _dataProtectionProvider = dataProtectionProvider;
        }
        public void SignIn(string username)
        {
            var protector = _dataProtectionProvider.CreateProtector("auth-cookie");
            _httpContextAccessor.HttpContext.Response.Headers.SetCookie = "auth=" + protector.Protect("usr:" + username);
        }
    }
}
