using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class CreateActorDTO
    {
        [Required]
        [StringLength(maximumLength: 200)]
        public string Name { get; set; }
        public string Biography { get; set; }
        public DateTime BirthDate { get; set; }
    }
}
