import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.ts';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pawmate';

const seed = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        const salt = await bcrypt.genSalt(10);
        const hashedAdminPassword = await bcrypt.hash('admin123', salt);
        const hashedUserPassword = await bcrypt.hash('user123', salt);

        // Clear existing demo users if any
        await User.deleteMany({ email: { $in: ['admin@pawmate.com', 'user@pawmate.com'] } });

        // Create Admin
        const admin = new User({
            name: 'Demo Admin',
            email: 'admin@pawmate.com',
            password: hashedAdminPassword,
            role: 'admin',
            phone: '0712345678',
            status: 'active'
        });

        // Create User
        const user = new User({
            name: 'Demo User',
            email: 'user@pawmate.com',
            password: hashedUserPassword,
            role: 'user',
            phone: '0712345679',
            status: 'active'
        });

        await admin.save();
        await user.save();

        console.log('Seeding successful!');
        console.log('Admin: admin@pawmate.com / admin123');
        console.log('User: user@pawmate.com / user123');

        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();
