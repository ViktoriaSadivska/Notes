import './search.styles.css'
import { Component } from 'react'

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            day: '',
            month: '',
            year: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateSearch = this.handleDateSearch.bind(this);
        this.handleTextSearch = this.handleTextSearch.bind(this);
    }

    handleTextSearch = (e) => {
        this.props.searchNotes(e.target.value)
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleDateSearch() {
        const { day, month, year } = this.state;
        this.props.filterByDate(day, month, year);
    }

    render() {
        const { day, month, year } = this.state;

        const days = [];
        for (let i = 1; i <= 31; i++) {
            days.push(<option key={i} value={i}>{i}</option>);
        }

        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        const years = [];
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= currentYear - 10; i--) {
            years.push(<option key={i} value={i}>{i}</option>);
        }


        return (
            <div>
                <div className="noteSearch">
                    <input
                        type="search"
                        placeholder="Search..."
                        onChange={this.handleTextSearch} />
                </div>
                <div className="noteSearch">
                    <div className="horizontalAllign">
                        <select name="day" value={day} onChange={this.handleChange} >
                            <option value="">Day</option>
                            {days}
                        </select>

                        <select name="month" value={month} onChange={this.handleChange}>
                            <option value="">Month</option>
                            {months.map((month, index) => (
                                <option key={index} value={index + 1}>{month}</option>
                            ))}
                        </select>

                        <select name="year" value={year} onChange={this.handleChange}>
                            <option value="">Year</option>
                            {years}
                        </select>
                    </div>

                    <button onClick={this.handleDateSearch}>Search</button>
                </div>
            </div>
           
        )
    }
}

export default Search