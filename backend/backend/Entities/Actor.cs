using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class Actor
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 200)]
        public string Name { get; set; }
        public string Biography { get; set; }
        public DateTime BirthDate { get; set; }
        public string Photo { get; set; }
    }
}
