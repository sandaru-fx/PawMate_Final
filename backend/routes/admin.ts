import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.ts';
import Dog from '../models/Dog.ts';
import { protect, admin } from '../middleware/auth.ts';

const router = express.Router();

// Get Admin Profile
router.get('/profile', protect, admin, async (req, res) => {
    try {
        console.log('GET /admin/profile request for user:', req.user?._id);
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            console.log('User not found for ID:', req.user?._id);
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error in GET /admin/profile:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update Admin Profile
router.put('/profile', protect, admin, async (req, res) => {
    try {
        console.log('PUT /admin/profile request:', req.body);
        const user = await User.findById(req.user._id);
        if (!user) {
            console.log('User not found for update:', req.user?._id);
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;

        if (req.body.password) {
            console.log('Updating password...');
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        await user.save();
        console.log('User profile updated successfully:', user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
        });
    } catch (error) {
        console.error('Error in PUT /admin/profile:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Get Dashboard Stats
router.get('/stats', protect, admin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalDogs = await Dog.countDocuments();
        const pendingDogs = await Dog.countDocuments({ status: 'pending' });

        // In a real app, calculate revenue from Payment model
        const revenue = 42500;

        res.json({
            totalUsers,
            totalDogs,
            pendingDogs,
            revenue
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get All Dogs
router.get('/dogs', protect, admin, async (req, res) => {
    try {
        const { status } = req.query;
        let query = {};
        if (status && status !== 'all') {
            // @ts-ignore
            query = { status };
        }
        // Final_Pr Dog model uses 'ownerId'
        const dogs = await Dog.find(query).populate('ownerId', 'name email avatar');
        res.json(dogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Approve Dog Profile
router.put('/dogs/:id/approve', protect, admin, async (req, res) => {
    try {
        const dog = await Dog.findById(req.params.id);
        if (!dog) return res.status(404).json({ message: 'Dog not found' });

        dog.status = 'approved';
        await dog.save();

        res.json({ message: 'Dog profile approved', dog });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Reject Dog Profile
router.put('/dogs/:id/reject', protect, admin, async (req, res) => {
    try {
        const dog = await Dog.findById(req.params.id);
        if (!dog) return res.status(404).json({ message: 'Dog not found' });

        dog.status = 'rejected';
        await dog.save();

        res.json({ message: 'Dog profile rejected', dog });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
