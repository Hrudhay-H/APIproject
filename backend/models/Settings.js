const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    monthlyBudget: {
        type: Number,
        default: 500
    },
    alertThreshold: {
        type: Number,
        default: 80
    },
    userProfile: {
        name: { type: String, default: 'John Doe' },
        email: { type: String, default: 'john.doe@antigravity.dev' },
        organization: { type: String, default: 'Antigravity Inc.' },
        plan: { type: String, default: 'Professional' }
    },
    emailAlerts: {
        enabled: { type: Boolean, default: false },
        email: { type: String, default: '' },
        budgetAlertSent: { type: Boolean, default: false }
    }
});

module.exports = mongoose.model('Settings', settingsSchema);