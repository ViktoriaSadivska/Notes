namespace webapi.Models
{
    public interface INoteRepository
    {
        IEnumerable<Note> GetAll();
        Note Get(int id);
        Note Add(Note item);
        void Remove(int id);
        bool Update(Note item);
    }
}
