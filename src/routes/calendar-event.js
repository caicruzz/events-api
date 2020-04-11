const express = require('express');
const router = new express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const CalendarEvent = require('../models/calendar-event');


router.get('/api/events/month/', async (req, res) => {
    const { month, year } = req.query;

    if (!month) return res.status(400).send('month is required');
    if (!year) return res.status(400).send('year is required');

    // JS months are 0 indexed
    const startSearchDate = new Date(`${year}-${month}-01`);
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
    const { title, start, end, color, assignedTo } = req.body;

    const calendarEvent = new CalendarEvent({
        title,
        start,
        end,
        color,
        assignedTo
    });

    try {
        res.send(await calendarEvent.save({ new: true }));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.patch('/api/events/:id', async (req, res) => {
    const eventId = ObjectId(req.params.id);
    let foundEvent;

    try {
        foundEvent = await CalendarEvent.findByIdAndUpdate(eventId, req.body, { new: true });
    } catch (e) {
        return res.send(e.message);
    }

    if (!foundEvent) return res.sendStatus(404);

    res.send(foundEvent);
});

router.delete('/api/events/:id', async (req, res) => {
    const eventId = ObjectId(req.params.id);
    let foundEvent;

    try {
        foundEvent = await CalendarEvent.findByIdAndDelete(eventId)
    } catch (e) {
        return res.send(e.message);
    }

    if (!foundEvent) return res.sendStatus(404);

    res.sendStatus(200);
});

module.exports = router;
