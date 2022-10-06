using backend.Validations;
using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Genre
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 50)]
        [FirstCapitalLetter]
        public string Name { get; set; }

    }
}
