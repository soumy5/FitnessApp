const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database/db');
const authRoutes = require('./routes/authRoutes');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/workouts', require('./routes/workoutRoutes'));
app.use('/fitnessplan', require('./routes/fitnessplanRoutes'));


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
