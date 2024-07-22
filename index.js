const app = require('./app');

const port = 3000;

app.get('/', (req, res)=>{
    res.send('Backend written by PhutiCee');
})
app.listen(port, ()=>{
    console.log(`Server listening on http://localhost:${port}`);
})