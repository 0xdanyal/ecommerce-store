import User from '../models/authModel.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: 'User already exists' });

        const user = await User.create({ email, password, role: role || 'customer' });

        return res.status(201).json({ user: { id: user._id, email: user.email, role: user.role } });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

//======================================================
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password required' });


        const user = await User.findOne({ email }).select('+password');
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.json({ user: { id: user._id, email: user.email, role: user.role }, token });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};