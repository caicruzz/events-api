const mongoose = require('mongoose');

const calendarEventSchema = mongoose.Schema({
    id: Number,
    title: { type: String, required: [true, 'title is required']},
    start: { type: Date, required: [true, 'start is required']},
    end: { type: Date, required: [true, 'end is required']},
    color: { type: String, required: [true, 'color is required']},
    assignedTo: { type: String, required: [true, 'assignedTo is required'] },
    createdBy: { id: Number, firstName: String, lastName: String, phone: String, email: String },
});

const CalendarEvent = mongoose.model('Event', calendarEventSchema);

module.exports = CalendarEvent;
