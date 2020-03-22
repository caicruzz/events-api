const express = require('express');
const router = new express.Router();

const CalendarEvent = require('../models/calendar-event');


router.get('/api/events/month/', async (req, res) => {
    const { month, year = new Date().getFullYear() } = req.body;
    const startSearchDate = new Date(`${year}-${month}-01`);
    const endSearchDate = new Date(`${year}-${month + 1}-01`);

    res.send(await CalendarEvent.find({ startDate: { $gte: startSearchDate, $lt: endSearchDate}}));
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
    const { title, startDate, endDate, color } = req.body;

    const calendarEvent = new CalendarEvent({
        title,
        startDate,
        endDate,
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
