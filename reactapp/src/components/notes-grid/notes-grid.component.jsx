import './notes-grid.styles.css'
import { Component } from 'react'
import Search from '../search/search.component'
import Note from '../note/note.component'

let currentStr = ""


class NotesGrid extends Component {
    constructor(props) {
        super(props)
        this.state = { notes: this.props.notes }

        this.filterNotes = this.filterNotes.bind(this)
        this.filterByDate = this.filterByDate.bind(this)
    }

    filterNotes(searchStr) {
        let filteredNotes = this.props.notes.filter((note) => {
            return note.about.toLowerCase().includes(searchStr.toLowerCase())
        })

        currentStr = searchStr

        this.setState({ notes: filteredNotes })
    }

    filterByDate(day, month, year) {
        let filteredNotes = this.props.notes.filter((note) => {
            if (new Date(note.date).getDate() === parseInt(day)) {
                return true;
            }
            if (new Date(note.date).getMonth() === parseInt(month) - 1) {
                return true;
            }
            if (new Date(note.date).getFullYear() === parseInt(year)) {
                return true;
            }
            return false;
        })

        this.setState({ notes: filteredNotes });
    }

    formatDate(date) {
        const formattedDate = new Date(date);
        return `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
    }

    render() {
        let notes
        this.state.notes.length == 0 || currentStr == "" ? notes = this.props.notes : notes = this.state.notes

        return (
            <div>
                <Search searchNotes={this.filterNotes} filterByDate={this.filterByDate} />
                <div className="notes-grid">
                    {
                        notes.map((note) => {
                            return <Note
                                key={note.id}
                                id={note.id}
                                color={note.color}
                                about={note.about}
                                hashtags={note.hashtags}
                                priority={note.priority}
                                checked={note.checked}
                                date={this.formatDate(note.date)}
                                onNoteDelete={this.props.onNoteDelete}
                                onNoteSelect={this.props.onNoteSelect}
                                onCheckboxClick={this.props.onCheckboxClick}
                            ></Note>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default NotesGrid