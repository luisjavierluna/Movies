using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Genre
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 50)]
        public string Name { get; set; }

    }
}
