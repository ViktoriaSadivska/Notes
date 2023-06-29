import './notes-app.styles.css'
import { Component } from 'react'
import NoteEditor from '../note-editor/note-editor.component'
import NotesGrid from '../notes-grid/notes-grid.component'

class NotesApp extends Component {
    constructor(props) {
        super(props)
        this.state = { notes: [], selectedNote: null, loading: true }

        this.handleNoteAdd = this.handleNoteAdd.bind(this)
        this.handleNoteDelete = this.handleNoteDelete.bind(this)
        this.handleNoteEdit = this.handleNoteEdit.bind(this)
        this.handleNoteSelect = this.handleNoteSelect.bind(this)
        this.handleCheckboxClick = this.handleCheckboxClick.bind(this)
    }

    async handleCheckboxClick(id) {
        var note = this.state.notes.find(n => n.id === id)
        note.checked = !note.checked;

        this.handleNoteEdit(note)
    }

    componentDidMount() {
        this.populateNotesData();
    }

    async handleNoteAdd(newNote) {
        console.log(JSON.stringify(newNote))
        try {
            const response = await fetch('https://localhost:7275/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNote),
            });
            const data = await response.json();
            if (response.ok) {
                this.setState((prevState) => ({
                    notes: [...prevState.notes, data],
                }));
            } else {
                console.error('Error adding note:', data);
            }
        } catch (error) {
            console.error('Error adding note:', error);
        }
    }

    async handleNoteEdit(editedNote) {
        
        try {
            const response = await fetch(`https://localhost:7275/notes/${editedNote.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedNote),
            });
            window.location.reload(false);
        } catch (error) {
            console.error('Error updating note:', error);
        }
    }   

    async handleNoteDelete(id) {
        try {
            const response = await fetch(`https://localhost:7275/notes/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                this.setState((prevState) => ({
                    notes: prevState.notes.filter((note) => note.id !== id),
                }));
            } else {
                console.error('Error deleting note:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }

    async handleNoteSelect(id) {
        try {
            const response = await fetch(`https://localhost:7275/notes/${id}`);
            const data = await response.json();
            this.setState({
                selectedNote: data,
            });
        } catch (error) {
            console.error('Error fetching note:', error);
        }
    }

    render() {
        return (
            <div>
                <NoteEditor selectedNote={this.state.selectedNote}
                    onNoteAdd={this.handleNoteAdd}
                    onNoteEdit={this.handleNoteEdit} />
                <NotesGrid notes={this.state.notes}
                    onNoteDelete={this.handleNoteDelete}
                    onNoteSelect={this.handleNoteSelect}
                    onCheckboxClick={this.handleCheckboxClick }                />
            </div>
        )
    }


    async populateNotesData() {
        try {
            const response = await fetch('https://localhost:7275/notes'); 
            const data = await response.json();
            this.setState({ notes: data, loading: false });
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }
}

export default NotesApp