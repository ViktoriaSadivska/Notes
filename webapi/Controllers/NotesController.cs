using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Web.Http;
using webapi.Models;


namespace webapi.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("[controller]")]
    public class NotesController : ControllerBase
    {
        static readonly INoteRepository repository = new NoteRepository();
        private readonly ILogger<NotesController> _logger;

        public NotesController(ILogger<NotesController> logger)
        {
            _logger = logger;
        }

        [Microsoft.AspNetCore.Mvc.HttpGet]
        public IEnumerable<Note> GetAllNotes()
        {
            return repository.GetAll();
        }

        [Microsoft.AspNetCore.Mvc.HttpGet("{id}")]
        public Note GetNote(int id)
        {
            Note item = repository.Get(id);
            if(item == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return item;
        }

        [Microsoft.AspNetCore.Mvc.HttpPost]
        public Note PostNote(Note item)
        {
            item = repository.Add(item);
            return item;
        }

        [Microsoft.AspNetCore.Mvc.HttpPut("{id}")]
        public void PutNote(int id, Note note)
        {
            note.Id = id;
            if (!repository.Update(note))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        [Microsoft.AspNetCore.Mvc.HttpDelete("{id}")]
        public void DeleteNote(int id)
        {
            Note item = repository.Get(id);
            if(item == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            repository.Remove(id);
        }
    }
}
