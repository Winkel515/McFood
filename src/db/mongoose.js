import mongoose from 'mongoose';
const { DB_URL = '' } = process.env;
mongoose.set('strictQuery', false);
mongoose.connect(DB_URL);
