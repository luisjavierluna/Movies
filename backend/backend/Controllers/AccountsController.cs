using backend.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly IConfiguration configuration;
        private readonly SignInManager<IdentityUser> signInManager;

        public AccountsController(
            UserManager<IdentityUser> userManager,
            IConfiguration configuration,
            SignInManager<IdentityUser> signInManager)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            this.signInManager = signInManager;
        }

        [HttpPost("create")]
        public async Task<ActionResult<AuthenticationResponse>> Crear([FromBody] UserCredentials credentials)
        {
            var user = new IdentityUser { UserName = credentials.Email, Email = credentials.Email };
            var result = await userManager.CreateAsync(user, credentials.Password);

            if (result.Succeeded)
            {
                return await BuildToken(credentials);
            }
            else
            {
                return BadRequest(result.Errors);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login([FromBody] UserCredentials credentials)
        {
            var result = await signInManager.PasswordSignInAsync(credentials.Email, credentials.Password,
                isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return await BuildToken(credentials);
            }
            else
            {
                return BadRequest("Wrong login");
            }
        }

        private async Task<AuthenticationResponse> BuildToken(UserCredentials credentials)
        {
            var claims = new List<Claim>()
            {
                new Claim("email", credentials.Email)
            };

            var user = await userManager.FindByEmailAsync(credentials.Email);
            var claimsDB = await userManager.GetClaimsAsync(user);

            claims.AddRange(claimsDB);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["jwtKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddYears(1);

            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims,
                expires: expiration, signingCredentials: creds);

            return new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }

    }
}
