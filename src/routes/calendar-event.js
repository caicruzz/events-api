const express = require('express');
const router = new express.Router();

const CalendarEvent = require('../models/calendar-event');


router.get('/api/events/month/', async (req, res) => {
    const { month, year } = req.query;
    if (!month) return res.status(400).send('month is required');
    if (!year) return res.status(400).send('year is required');

    // JS months are 0 indexed
    const startSearchDate = new Date(`${year}-${parseInt(month) + 1}-01`);
    const endSearchDate = new Date(`${year}-${startSearchDate.getMonth() + 2}-01`);

    res.send(await CalendarEvent.find({ start: { $gte: startSearchDate, $lt: endSearchDate}}));
});

router.get('/api/events/range/', async (req, res) => {
    const { start, end } = req.query;
    if (!start) return res.status(400).send('start is required');
    if (!end) return res.status(400).send('end is required');

    res.send(await CalendarEvent.find({ start: { $gte: start, $lte: end}}));
});

router.get('/api/events/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const calendarEvent = await CalendarEvent.findById(id);

        if (!calendarEvent) {
            return res.sendStatus(404);
        }

        res.send(calendarEvent);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/api/events/', async (req, res) => {
    const { title, start, end, color } = req.body;

    const calendarEvent = new CalendarEvent({
        title,
        start,
        end,
        color
        // TODO assignedTo && createdBy properties
    });

    try {
        res.send(await calendarEvent.save({ new: true }));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.put('/api/events/', (req, res) => {
    res.send('putEvent');
});

router.delete('/api/events/', (req, res) => {
    res.send('delEvent');
});

module.exports = router;
