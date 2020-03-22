const mongoose = require('mongoose');

const calendarEventSchema = mongoose.Schema({
    id: Number,
    title: { type: String, required: [true, 'title is required']},
    startDate: { type: Date, required: [true, 'startDate is required']},
    endDate: { type: Date, required: [true, 'endDate is required']},
    color: { type: String, required: [true, 'color is required']},
    assignedTo: { id: Number, firstName: String, lastName: String, phone: String, email: String },
    createdBy: { id: Number, firstName: String, lastName: String, phone: String, email: String },
    createdDate: { type: Date, default: Date.now }
});

const CalendarEvent = mongoose.model('Event', calendarEventSchema);

module.exports = CalendarEvent;
