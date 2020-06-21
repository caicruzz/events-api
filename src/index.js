const express = require('express');
const app = express();

const calendarEventRouter = require('./routes/calendar-event');
const cors = require('cors');
const corsOptions = { origin: 'http://localhost:3000'};
require('./db/mongoose');

app.use(express.json());
app.use(cors(corsOptions));
app.use(calendarEventRouter);

app.listen(3001, () => {
    console.log('listening on port 3000')
});

