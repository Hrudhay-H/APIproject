const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    baseUrl: {
        type: String,
        required: true
    },
    monthlyCost: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    color: {
        type: String,
        default: '#3b82f6'
    },
    // API Key Management
    apiKey: {
        type: String,
        select: false  // Don't return in queries by default
    },
    apiKeyIV: {
        type: String,
        select: false
    },
    authType: {
        type: String,
        enum: ['none', 'api-key', 'bearer-token', 'basic-auth', 'oauth2'],
        default: 'none'
    },
    authHeaderName: {
        type: String,
        default: 'Authorization'
    },
    // Environment & Metadata
    environment: {
        type: String,
        enum: ['development', 'staging', 'production'],
        default: 'production'
    },
    version: {
        type: String,
        default: 'v1'
    },
    docsUrl: {
        type: String
    },
    webhookUrl: {
        type: String
    },
    tags: [{
        type: String
    }],
    notes: {
        type: String,
        maxlength: 500
    },
    // Rate Limiting
    rateLimit: {
        requestsPerMinute: { type: Number, default: 0 },
        requestsPerDay: { type: Number, default: 0 },
        requestsPerMonth: { type: Number, default: 0 }
    },
    // Health Monitoring
    healthStatus: {
        type: String,
        enum: ['healthy', 'degraded', 'down', 'unknown'],
        default: 'unknown'
    },
    lastHealthCheck: {
        type: Date
    },
    uptime: {
        type: Number,
        default: 0  // Percentage
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Api', apiSchema);