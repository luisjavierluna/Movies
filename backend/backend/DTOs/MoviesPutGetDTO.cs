namespace backend.DTOs
{
    public class MoviesPutGetDTO
    {
        public MovieDTO Movie { get; set; }
        public List<GenreDTO> SelectedGenres { get; set; }
        public List<GenreDTO> NoSelectedGenres { get; set; }
        public List<TheaterDTO> SelectedTheaters { get; set; }
        public List<TheaterDTO> NoSelectedTheaters { get; set; }
        public List<ActorMovieDTO> Actors { get; set; }
    }
}
