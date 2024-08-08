require('dotenv').config();
import express, {Request, Response} from 'express';
const app = express();
const port = process.env.PORT || 3000;
import problemRoute from './routes/problemRoute';
import cors from 'cors';


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    return res.json('hello there!');
});


app.use('/api/problem', problemRoute);

app.listen(port, () => {
    console.log('server is running on port ✅', port );
});

