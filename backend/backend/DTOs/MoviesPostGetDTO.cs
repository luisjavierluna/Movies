namespace backend.DTOs
{
    public class MoviesPostGetDTO
    {
        public List<GenreDTO> Genres { get; set; }
        public List<TheaterDTO> Theaters { get; set; }
    }
}
