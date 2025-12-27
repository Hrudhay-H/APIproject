const mongoose = require('mongoose');

const apiCallSchema = new mongoose.Schema({
    apiId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Api',
        required: true
    },
    endpoint: {
        type: String,
        required: true
    },
    method: {
        type: String,
        enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        required: true
    },
    statusCode: {
        type: Number,
        required: true
    },
    responseTime: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

apiCallSchema.index({ apiId: 1, createdAt: -1 });

module.exports = mongoose.model('ApiCall', apiCallSchema);