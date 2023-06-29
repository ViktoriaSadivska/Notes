using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Note
    {
        [ScaffoldColumn(false)]
        public int Id { get; set; }
        [Required]
        public string About { get; set; }

        public string Priority { get; set; }
        public string Hashtags { get; set; }
        public string Color { get; set; }
        public bool Checked { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
    }
}
