using System.Data.Entity.Migrations;

namespace webapi.Models
{
    public class NoteRepository : INoteRepository
    {
        private NotesContext _context;

        public NoteRepository()
        {
            _context = new NotesContext();
            //_context.Notes.Add(new Note { About = "about", Date = new DateTime(2023,5,3), Hashtags = "hashtag1", Priority = "Hight", Color = "#bbdefb", Checked=true });
            //_context.Notes.Add(new Note { About = "about", Date = DateTime.Now, Hashtags = "hashtag2", Priority = "Medium", Color = "#e1bee7", Checked=false });
            //_context.Notes.Add(new Note { About = "about", Date = DateTime.Now, Hashtags = "hashtag3", Priority = "Low", Color = "#e1bee7", Checked=true });
            _context.SaveChanges();
        }

        public IEnumerable<Note> GetAll()
        {
            return _context.Notes.ToList();
        }

        public Note Get(int id)
        {
            return _context.Notes.ToList().Find(n => n.Id == id);
        }

        public Note Add(Note item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }
            _context.Notes.Add(item);
            _context.SaveChanges();

            return item;
        }

        public void Remove(int id)
        {
            Note note = _context.Notes.Find(id);
            _context.Notes.Remove(note);
            _context.SaveChanges();
        }

        public bool Update(Note item)
        {
            if (item == null)
            {
                throw new ArgumentNullException("item");
            }

            Note note = _context.Notes.Find(item.Id);
            if (note == null)
            {
                return false;
            }

            _context.Notes.AddOrUpdate(item);
            _context.SaveChanges();
            return true;
        }
    }
}
