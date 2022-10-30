using backend.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ActorsMovies>()
                .HasKey(x => new { x.ActorId, x.MovieId });

            modelBuilder.Entity<GenresMovies>()
                .HasKey(x => new { x.GenreId, x.MovieId });

            modelBuilder.Entity<TheatersMovies>()
                .HasKey(x => new { x.TheaterId, x.MovieId });

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Genre> Genres { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Theater> Theaters { get; set; }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<ActorsMovies> ActorsMovies { get; set; }
        public DbSet<GenresMovies> GenresMovies { get; set; }
        public DbSet<TheatersMovies> TheatersMovies { get; set; }
    }
}
