import './note.styles.css'
import { Component } from 'react'
import ed from './edit.png'
import del from './delete.png'

class Note extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            about: this.props.about,
            color: this.props.color,
            priority: this.props.priority,
            date: this.props.date,
            hashtags: this.props.hashtags,
            checked: this.props.checked
        }
    }

    render() {
        return (
            <div className="note" style={{ backgroundColor: this.state.color }}>
                <div className="note-header">
                    <span className="hashtags">{this.state.hashtags}</span>
                    <div className="edit-delete-buttons">
                        <a className="btn-floating btn-small waves-effect waves-light edit-button" onClick={() => this.props.onNoteSelect(this.state.id)}><span><img src={ed} alt="" /></span></a>
                        <a className="btn-floating btn-small waves-effect waves-light delete-button" onClick={() => this.props.onNoteDelete(this.state.id)}><span><img src={del} alt="" /></span></a>
                    </div>
                </div>
                <div className="note-body">
                    <p className="note-text">{this.state.about}</p>
                </div>
                <div className="note-footer">
                    <span className="priority">{this.state.priority} priority</span>
                    <span className="date">{this.state.date}</span>
                    <label>
                        <input checked={this.state.checked} onClick={() => this.props.onCheckboxClick(this.state.id)} type="checkbox" className="filled-in" />
                        <span></span>
                    </label>
                </div>
            </div>
        )
    }
}

export default Note
