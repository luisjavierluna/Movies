using AutoMapper;
using backend.DTOs;
using backend.Entities;
using backend.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class MoviesController : ControllerBase
    {

        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IStorerFiles storerFiles;
        private readonly UserManager<IdentityUser> userManager;
        private readonly string container = "movies";

        public MoviesController(
            ApplicationDbContext context,
            IMapper mapper,
            IStorerFiles storerFiles,
            UserManager<IdentityUser> userManager)
        {
            this.context = context;
            this.mapper = mapper;
            this.storerFiles = storerFiles;
            this.userManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<LandingPageDTO>> Get()
        {
            var top = 6;
            var hoy = DateTime.Today;

            var futureReleases = await context.Movies
                .Where(x => x.ReleaseDate > hoy)
                .OrderBy(x => x.ReleaseDate)
                .Take(top)
                .ToListAsync();

            var inTheaters = await context.Movies
                .Where(x => x.InTheaters)
                .OrderBy(x => x.ReleaseDate)
                .Take(top)
                .ToListAsync();

            var result = new LandingPageDTO();
            result.FutureReleases = mapper.Map<List<MovieDTO>>(futureReleases);
            result.InTheaters = mapper.Map<List<MovieDTO>>(inTheaters);

            return result;
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<MovieDTO>> Get(int id)
        {
            var movie = await context.Movies
                .Include(x => x.GenresMovies).ThenInclude(x => x.Genre)
                .Include(x => x.ActorsMovies).ThenInclude(x => x.Actor)
                .Include(x => x.TheatersMovies).ThenInclude(x => x.Theater)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null) { return NotFound(); }

            var averageVote = 0.0;
            var userVote = 0;

            if (await context.Ratings.AnyAsync(x => x.MovieId == id))
            {
                averageVote = await context.Ratings.Where(x => x.MovieId == id)
                    .AverageAsync(x => x.Score);

                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
                    var user = await userManager.FindByEmailAsync(email);
                    var userId = user.Id;
                    var ratingDB = await context.Ratings.
                        FirstOrDefaultAsync(x => x.UserId == userId && x.MovieId == id);

                    if (ratingDB != null)
                    {
                        userVote = ratingDB.Score;
                    }
                }
            }

            var dto = mapper.Map<MovieDTO>(movie);
            dto.UserVote = userVote;
            dto.AverageVote = averageVote;
            dto.Actors = dto.Actors.OrderBy(x => x.Sequence).ToList();
            return dto;
        }

        [HttpGet("filter")]
        [AllowAnonymous]
        public async Task<ActionResult<List<MovieDTO>>> Filter([FromQuery] FilterMoviesDTO filterMoviesDTO)
        {
            var moviesQueryable = context.Movies.AsQueryable();

            if (!string.IsNullOrEmpty(filterMoviesDTO.Title))
            {
                moviesQueryable = moviesQueryable.Where(x => x.Title.Contains(filterMoviesDTO.Title));
            }

            if (filterMoviesDTO.InTheaters)
            {
                moviesQueryable = moviesQueryable.Where(x => x.InTheaters);
            }

            if (filterMoviesDTO.FutureReleases)
            {
                var today = DateTime.Today;
                moviesQueryable = moviesQueryable.Where(x => x.ReleaseDate > today);
            }

            if (filterMoviesDTO.GenreId != 0)
            {
                moviesQueryable = moviesQueryable
                    .Where(x => x.GenresMovies.Select(y => y.GenreId)
                    .Contains(filterMoviesDTO.GenreId));
            }

            await HttpContext.InsertParametersPaginationInHeader(moviesQueryable);

            var movies = await moviesQueryable.Paginate(filterMoviesDTO.paginationDTO).ToListAsync();
            return mapper.Map<List<MovieDTO>>(movies);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] CreateMovieDTO createMovieDTO)
        {
            var movie = mapper.Map<Movie>(createMovieDTO);

            if (createMovieDTO.Poster != null)
            {
                movie.Poster = await storerFiles.SaveFile(container, createMovieDTO.Poster);
            }

            SetActorsSequence(movie);

            context.Add(movie);
            await context.SaveChangesAsync();
            return movie.Id;
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<MoviesPostGetDTO>> PostGet()
        {
            var theaters = await context.Theaters.ToListAsync();
            var genres = await context.Genres.ToListAsync();

            var theatersDTO = mapper.Map<List<TheaterDTO>>(theaters);
            var genresDTO = mapper.Map<List<GenreDTO>>(genres);

            return new MoviesPostGetDTO() { Theaters = theatersDTO, Genres = genresDTO };
        }

        [HttpGet("PutGet/{id:int}")]
        public async Task<ActionResult<MoviesPutGetDTO>> PutGet(int id)
        {
            var movieActionResult = await Get(id);
            if (movieActionResult.Result is NotFoundResult) { return NotFound(); }

            var movie = movieActionResult.Value;

            var selectedGenresIds = movie.Genres.Select(x => x.Id).ToList();
            var noSelectedGenres = await context.Genres
                .Where(x => !selectedGenresIds.Contains(x.Id))
                .ToListAsync();

            var selectedTheatersIds = movie.Theaters.Select(x => x.Id).ToList();
            var noSelectedTheaters = await context.Theaters
                .Where(x => !selectedTheatersIds.Contains(x.Id))
                .ToListAsync();

            var noSelectedGenresDTO = mapper.Map<List<GenreDTO>>(noSelectedGenres);
            var noSelectedTheatersDTO = mapper.Map<List<TheaterDTO>>(noSelectedTheaters);

            var response = new MoviesPutGetDTO();
            response.Movie = movie;
            response.SelectedGenres = movie.Genres;
            response.NoSelectedGenres= noSelectedGenresDTO;
            response.SelectedTheaters = movie.Theaters;
            response.NoSelectedTheaters = noSelectedTheatersDTO;
            response.Actors = movie.Actors;
            return response;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] CreateMovieDTO createMovieDTO)
        {
            var movie = await context.Movies
                .Include(x => x.ActorsMovies)
                .Include(x => x.GenresMovies)
                .Include(x => x.TheatersMovies)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null)
            {
                return NotFound();
            }

            movie = mapper.Map(createMovieDTO, movie);

            if (createMovieDTO.Poster != null)
            {
                movie.Poster = await storerFiles.EditFile(container, createMovieDTO.Poster, movie.Poster);
            }

            SetActorsSequence(movie);

            await context.SaveChangesAsync();
            return NoContent();
        }

        private void SetActorsSequence(Movie movie)
        {
            if (movie.ActorsMovies != null)
            {
                for (int i = 0; i < movie.ActorsMovies.Count; i++)
                {
                    movie.ActorsMovies[i].Sequence = i;
                }
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var movie = await context.Movies.FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null)
            {
                return NotFound();
            }

            context.Remove(movie);
            await context.SaveChangesAsync();

            await storerFiles.DeleteFile(movie.Poster, container);

            return NoContent();
        }
    }
}
