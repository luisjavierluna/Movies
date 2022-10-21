using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Movie
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 300)]
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Trailer { get; set; }
        public bool InTheaters { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Poster { get; set; }
        public List<ActorsMovies> ActorsMovies { get; set; }
        public List<GenresMovies> GenresMovies { get; set; }
        public List<TheatersMovies> TheatersMovies { get; set; }
    }
}
