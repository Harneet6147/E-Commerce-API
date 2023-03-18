const express = require('express');
const env = require('dotenv').config();
const port = process.env.PORT || 5000;
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDb = require('./config/db')

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);


app.listen(port, () => {
    console.log(`Listening on port number ${port}`);
});