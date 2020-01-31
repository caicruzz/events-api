const express = require ('express');
const app = express();

app.get('/api/event/',(req,res)=>{
    res.send('getEvent');
});

app.post('/api/event/',(req,res)=>{
    res.send('postEvent');
});

app.put('/api/event/',(req,res)=>{
    res.send('putEvent');
});

app.delete('/api/event/',(req,res)=>{
    res.send('delEvent');
});


app.listen(3000,()=>{
    console.log('listening on port 3000')
})
