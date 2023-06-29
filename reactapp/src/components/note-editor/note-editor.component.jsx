import M from 'materialize-css';
import './note-editor.styles.css'
import React, { Component } from 'react';

let colors = ["#bbdefb", "#f8bbd0", "#e1bee7", "#b2dfdb", "#f0f4c3", "#d7ccc8"];

class NoteEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            about: '',
            color: '',
            priority: 'medium',
            date: '',
            hashtags: '',
            checked: false,
            editingNoteId: null,
            checkedColor: false,
            isFormValid: false
        }

        this.handleCancel = this.handleCancel.bind(this)
        this.handleColorChange = this.handleColorChange.bind(this)
        this.handleNoteAdd = this.handleNoteAdd.bind(this)
        this.handleNoteAction = this.handleNoteAction.bind(this)
        this.handleAboutChange = this.handleAboutChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleHashtagsChange = this.handleHashtagsChange.bind(this)
        this.handlePriorityChange = this.handlePriorityChange.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedNote !== this.props.selectedNote) {
            const { id, about, color, priority, checked, date, hashtags } = this.props.selectedNote;
            this.setState({
                id,
                about,
                color,
                priority,
                checked,
                date,
                hashtags,
                editingNoteId: id,
            });
        }
    }

    handleAboutChange(e) {
        this.setState({
            about: e.target.value
        }, this.validateForm);
    }

    handlePriorityChange(e) {
        this.setState({
            priority: e.target.value
        }, this.validateForm);
    }

    handleDateChange(e) {
        this.setState({
            date: e.target.value
        }, this.validateForm);
    }

    handleHashtagsChange(e) {
        this.setState({
            hashtags: e.target.value
        }, this.validateForm);
    }

    handleColorChange(e, color) {
        this.input = e.target;
        this.setState({
            color: color,
            checkedColor: e.target.checked
        }, this.validateForm);
    }

    handleNoteAdd() {
        const newNote = {
            about: this.state.about,
            color: this.state.color,
            priority: this.state.priority,
            date: this.state.date,
            hashtags: this.state.hashtags,
            checked: this.state.checked,
            id: 0
        };

        this.props.onNoteAdd(newNote);

        this.resetForm();
    }

    handleCancel() {
        this.resetForm();
    }

    handleNoteAction() {
        const { about, color, priority, date, hashtags, checked, editingNoteId } = this.state;
        const newNote = {
            about: about,
            color,
            priority,
            date,
            hashtags,
            checked
        };

        newNote.id = editingNoteId;
        this.props.onNoteEdit(newNote);

        this.resetForm();
    }

    resetForm() {
        this.setState({
            id: 0,
            about: '',
            color: '',
            priority: 'medium',
            date: '',
            hashtags: '',
            editingNoteId: null,
            checked: false,
            isFormValid: false
        });
        if (this.state.checkedColor) this.input.checkedColor = false;
    }

    validateForm() {
        const { about, color, priority, date, hashtags } = this.state;
        const isFormValid = about !== '' && color !== '' && priority !== '' && date !== '' && hashtags !== '';
        this.setState({ isFormValid });
    }

    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);
        })
    }

    render() {
        if (this.state.editingNoteId) {
            return (
                <div className="note-editor">
                    <div className="input-field">
                        <textarea className="materialize-textarea" placeholder="Enter your note here..." rows={7} value={this.state.about} onChange={this.handleAboutChange}></textarea>
                    </div>

                    <div className="controls">
                        <div className="colors-list">
                            {
                                colors.map((el, i) => {
                                    return (
                                        <div key={i} style={{ backgroundColor: el }}>
                                            <input
                                                className="radio-custom"
                                                id={el}
                                                type="radio"
                                                name="color"
                                                onChange={(e) => this.handleColorChange(e, el)}
                                            />
                                            <label className="radio-custom-label" htmlFor={el} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>

                    <div className='grid-container'>

                        <div>
                            <label>Priority:</label>
                            <select
                                className="browser-default"
                                value={this.state.priority}
                                onChange={this.handlePriorityChange}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div>
                            <label>Get Done Date:</label>
                            <input
                                type="date"
                                value={this.state.date}
                                onChange={this.handleDateChange}
                            />
                        </div>

                        <div>
                            <label>Hashtags:</label>
                            <input
                                type="text"
                                value={this.state.hashtags}
                                onChange={this.handleHashtagsChange}
                            />
                        </div>

                        <div className="controls">
                            <button className="add-button" onClick={this.handleNoteAction} disabled={!this.state.isFormValid}>Save</button>
                            <button className="add-button" onClick={this.handleCancel}>Cancel</button>
                        </div>

                    </div>

                </div>
            )
        }
        return (
            <div className="note-editor">
                <div className="input-field">
                    <textarea className="materialize-textarea" placeholder="Enter your note here..." rows={7} value={this.state.about} onChange={this.handleAboutChange}></textarea>
                </div>

                <div className="controls">
                    <div className="colors-list">
                        {
                            colors.map((el, i) => {
                                return (
                                    <div key={i} style={{ backgroundColor: el }}>
                                        <input
                                            className="radio-custom"
                                            id={el}
                                            type="radio"
                                            name="color"
                                            onChange={(e) => this.handleColorChange(e, el)}
                                        />
                                        <label className="radio-custom-label" htmlFor={el} />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                <div className='grid-container'>

                    <div>
                        <label>Priority:</label>
                        <select
                            className="browser-default"
                            value={this.state.priority}
                            onChange={this.handlePriorityChange}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div>
                        <label>Get Done Date:</label>
                        <input
                            type="date"
                            value={this.state.date}
                            onChange={this.handleDateChange}
                        />
                    </div>

                    <div>
                        <label>Hashtags:</label>
                        <input
                            type="text"
                            value={this.state.hashtags}
                            onChange={this.handleHashtagsChange}
                        />
                    </div>

                    <div className="controls">
                        <button className="add-button" onClick={this.handleNoteAdd} disabled={!this.state.isFormValid}>Add</button>
                    </div>

                </div>

            </div>
        )
    }
}

export default NoteEditor;
