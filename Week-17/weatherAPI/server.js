const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Set up middleware to parse incoming request data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));

// Set up API endpoints
app.get('/weather/multiple-cities', async (req, res) => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/group', {
            params: {
                id: req.query.ids,
                q: req.query.q,
                units: 'metric',
                appid: process.env.OPENWEATHERMAP_API_KEY,
                page: req.query.page,
                cnt: req.query.limit,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/weather/filter', async (req, res) => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: req.query.q,
                units: 'metric',
                appid: process.env.OPENWEATHERMAP_API_KEY,
                page: req.query.page,
                cnt: req.query.limit,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/weather/forecast', async (req, res) => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                q: req.query.q,
                units: 'metric',
                appid: process.env.OPENWEATHERMAP_API_KEY,
                cnt: req.query.days || 7,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/weather/filtered-forecast', async (req, res) => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                q: req.query.q,
                units: 'metric',
                appid: process.env.OPENWEATHERMAP_API_KEY,
                cnt: req.query.days || 7,
            },
        });

        // Filter the forecast data based on date and time
        const { date, moment } = req.query;
        let filteredData = response.data.list.filter((item) => {
            if (date && moment) {
                const itemDate = new Date(item.dt_txt);
                const itemMoment = itemDate.getHours() < 12 ? 'morning' : itemDate.getHours() < 18 ? 'afternoon' : 'evening';
                return itemDate.toDateString() === date && itemMoment === moment;
            } else if (date) {
                const itemDate = new Date(item.dt_txt);
                return itemDate.toDateString() === date;
            } else if (moment) {
                const itemDate = new Date(item.dt_txt);
                const itemMoment = itemDate.getHours() < 12 ? 'morning' : itemDate.getHours() < 18 ? 'afternoon' : 'evening';
                return itemMoment === moment;
            }
        });

        res.json({ ...response.data, list: filteredData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

