const express = require('express');
const app = express();

const calendarEventRouter = require('./routes/calendar-event');
require('./db/mongoose');

app.use(express.json());
app.use(calendarEventRouter);

app.listen(3000, () => {
    console.log('listening on port 3000')
});

