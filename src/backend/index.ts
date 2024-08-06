require('dotenv').config();
import express from 'express';
const app = express();
const port = process.env.PORT;


app.get('/', (req, res) => {
    return res.json('hello there!');
});


app.listen(port, () => {
    console.log('server is running on port ✅', port, );
});

