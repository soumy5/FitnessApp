const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel'); 
const secretKey = '1234567'; 

const userauthobj={}

userauthobj.register = async (req, res) => {
    const { name, email, password, role, age, height, weight, fitness_goals } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            age,
            height,
            weight,
            fitness_goals
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log("error : ",error);
        
        res.status(500).json({ message: 'Error registering user', error });
    }
};

userauthobj.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            secretKey,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

module.exports=userauthobj
