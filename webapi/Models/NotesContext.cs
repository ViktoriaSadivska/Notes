using System.Data.Entity;

namespace webapi.Models
{
    public class NotesContext : DbContext
    {
        public NotesContext() : base("DefaultConnection") { }
        public DbSet<Note> Notes { get; set;}
    }
}
