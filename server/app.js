import express from "express";
const app = express();
import dotenv from 'dotenv';
dotenv.config()
import 'express-async-errors';
import morgan from 'morgan';


//Import DB
import connectDB from "./db/connect.js";

//Routers

import authRouter from './routes/auth.js';
import sectorRouter from './routes/sector.js';


//Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

if (process.env.NODE_ENV !=='production') {
    app.use(morgan('dev'))
}



app.use(express.json())

// app.get('/', (req, res) => {
//     // throw new Error('error')
//     res.send('Welcome to sectors')
// })

app.get('/api/v1', (req, res) => {
     // throw new Error('error')
    res.send('SECTORS')
})
    
//Use router
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/sector', authenticateUser, sectorRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log("Server runnning on " +port)
        })
    } catch (error) {
       console.log('Error: ', error) 
    }
}

start();