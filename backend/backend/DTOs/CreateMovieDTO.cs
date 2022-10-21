using backend.Utilities;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class CreateMovieDTO
    {
        [Required]
        [StringLength(maximumLength: 300)]
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Trailer { get; set; }
        public bool InTheaters { get; set; }
        public DateTime ReleaseDate { get; set; }
        public IFormFile Poster { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> GenresIds { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> TheatersIds { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<CreateMovieActorDTO>>))]
        public List<CreateMovieActorDTO> Actors { get; set; }
    }
}
