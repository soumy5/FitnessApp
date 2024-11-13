const Workout = require('../models/workoutmodel');

const workoutobj = {}


workoutobj.createworkoutlog = async (req, res) => {
    try {
        const { exercise_type, duration, calories_burned } = req.body;
        const userId = req.user._id; 
        const newWorkout = new Workout({
            exercise_type,
            duration,
            calories_burned,
            user_references: userId 
        });
        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

workoutobj.getworkoutlog = async (req, res) => {
    try {
        const workouts = await Workout.find() 
        res.status(200).json(workouts);
    } catch (error) {
        console.log("error:",error);
        
        res.status(500).json({ error: 'An error occurred while fetching workouts.' });
    }
}


workoutobj.getworkoutlogbyId = async (req, res) => {

    const userId = req.user._id;
    console.log("userid:",userId.toString());
    
    try {
        const workouts = await Workout.find({ user_references: userId }) 


        if (workouts.length === 0) {
            return res.status(404).json({ message: 'No workouts found for this user.' });
        }

        res.status(200).json(workouts);
    } catch (error) {
        console.log("error:",error);
        
        res.status(500).json({ error: 'An error occurred while fetching workouts.' });
    }
}


workoutobj.updateworkoutlog = async (req, res) => {
    try {
        const { type, duration, caloriesBurned } = req.body;
        const updatedWorkout = await Workout.findByIdAndUpdate(
            req.params.id,
            { type, duration, caloriesBurned },
            { new: true }
        );
        res.status(200).json(updatedWorkout);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

workoutobj.deleteworkoutlog = async (req, res) => {
    try {
        await Workout.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Workout deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = workoutobj
