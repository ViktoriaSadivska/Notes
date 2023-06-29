import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navigation from './components/navigation/navigation.component';
import Notes from './pages/notes/notes.component'
import NotFound from './pages/not-found/not-found.component'
import React, { Component } from 'react';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Navigation />
                    <div>
                        <Routes>
                            <Route path="/" element={<Notes />}/>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </Router>
            </div>
        )
    }

    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
