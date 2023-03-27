import express from 'express';
import { readdirSync } from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const morgan = require('morgan');

dotenv.config();

const app = express();

// db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

readdirSync('./routes').map(route =>
  app.use('/api', require(`./routes/${route}`))
);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
