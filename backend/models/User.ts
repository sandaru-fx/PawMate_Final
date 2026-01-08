import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String }, // Added for admin contact details
    role: { type: String, enum: ['user', 'admin'], default: 'user' },

    // Profile
    profileImage: { type: String }, // User repo preference
    avatar: { type: String },       // Admin repo preference (keep for compatibility or migrate)

    // Status (Admin features)
    status: { type: String, enum: ['active', 'suspended', 'pending'], default: 'active' },

    // Relations
    dogs: [{ type: Schema.Types.ObjectId, ref: 'Dog' }],

    // Preferences (User features)
    notificationPreferences: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true }
    },
    subscription: {
        plan: { type: String, enum: ['free', 'premium'], default: 'free' },
        expiresAt: { type: Date }
    }
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
