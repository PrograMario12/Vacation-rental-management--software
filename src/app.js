import express from 'express';
import morgan from 'morgan';2

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.json({ message: 'Welcome to my API' }));

app.get('/test', (req, res) => {
    throw new Error('Error de conexión');
    res.send('Test route')
});

app.use((err, req, res, next) => {
    res.status(500).json({ 
        status: "error",
        message: err.message });
});

export default app;