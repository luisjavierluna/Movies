using backend.Validations;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class CreateGenreDTO
    {
        [Required]
        [StringLength(maximumLength: 50)]
        [FirstCapitalLetter]
        public string Name { get; set; }
    }
}
