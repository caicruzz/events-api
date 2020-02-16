const express = require('express');
const app = express();
app.use(express.json());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/events')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not conect to MongoDB...', err))

const eventSchema = mongoose.Schema({
    id: Number,
    title: String,
    startDate: Date,
    endDate: Date,
    color: String,
    assignedTo: { id: Number, firstName: String, lastName: String, phone: String, email: String },
    createdBy: { id: Number, firstName: String, lastName: String, phone: String, email: String },
    createdDate: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);



app.get('/api/event/', (req, res) => {
    res.send('getEvent');
});

app.post('/api/event/', (req, res) => {
    res.send('postEvent');

    async function createEvent() {
        const event = new Event({
            id: req.body.id,
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            color: req.body.color,
            assignedTo: { id: req.body.assignedTo.id, firstName: req.body.assignedTo.firstName, lastName: req.body.assignedTo.lastName, phone: req.body.assignedTo.phone, email: req.body.assignedTo.email },
            createdBy: { id: req.body.createdBy.id, firstName: req.body.createdBy.firstName, lastName: req.body.createdBy.lastName, phone: req.body.createdBy.phone, email: req.body.createdBy.email }
            //createdDate: {type: Date, default: Date.now}
        })

        // async function createEvent(){
        //     const event = new Event({
        //         eventName: 'Predica5',
        //         eventOwner: 'PastorCai',
        //         eventDate: '2020-02-16T05:19:45.000+00:00',
        //         createdUser: 'usuario1',
        //         //createdDate: {type: Date, default: Date.now},
        //         isPublished: true
        //     })

        const result = await event.save();
        console.log(result);

    }

    createEvent();

});

app.put('/api/event/', (req, res) => {
    res.send('putEvent');
});

app.delete('/api/event/', (req, res) => {
    res.send('delEvent');
});


app.listen(3000, () => {
    console.log('listening on port 3000')
})
