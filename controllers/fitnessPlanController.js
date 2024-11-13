const FitnessPlan = require('../models/fitnessplanmodel');


exports.createFitnessPlan = async (req, res) => {
    try {
        const { planName, exercises } = req.body; 
        const trainerId = req.user.id; 

        if (!Array.isArray(exercises) || exercises.length === 0) {
            return res.status(400).json({ message: 'Exercises are required and must be an array' });
        }

        for (const exercise of exercises) {
            if (!exercise.name || !exercise.duration || !exercise.videoURL) {
                return res.status(400).json({ message: 'Each exercise must have a name, duration, and videoURL' });
            }
        }
        const newPlan = new FitnessPlan({
            trainer: trainerId,
            planName,
            exercises
        });

        await newPlan.save();

        res.status(201).json({
            message: 'Fitness plan created successfully!',
            plan: newPlan
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.getFitnessPlans = async (req, res) => {
    try {
        
        const plans = await FitnessPlan.find()

        res.status(200).json({ plans });
    } catch (error) {
        console.log("error:",error);
        
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.getFitnessPlanById = async (req, res) => {
    try {
        const id  = req.user._id;
        const plan = await FitnessPlan.find({ trainer: id }).populate('trainer', 'name');

        if (!plan) return res.status(404).json({ message: 'Plan not found' });

        res.status(200).json({ plan });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
