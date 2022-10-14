import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config()

import connectDB from './db/connect.js';

import Sector from './models/Sector.js';


const start = async () => {
   
    try {
        await connectDB(process.env.MONGO_URL)
        //Delete previous saved sectors in the databases
        await Sector.deleteMany()

        const jsonFile = JSON.parse(await readFile(new URL('./mock_data.json', import.meta.url)))
        await Sector.create(jsonFile)
        console.log('Success!!');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start ()