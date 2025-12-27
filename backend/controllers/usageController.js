const ApiCall = require('../models/ApiCall');
const Api = require('../models/Api');

exports.logApiCall = async (req, res) => {
    try {
        const { apiId, endpoint, method, statusCode, responseTime } = req.body;

        const apiCall = new ApiCall({
            apiId,
            endpoint,
            method,
            statusCode,
            responseTime
        });

        const newCall = await apiCall.save();
        const populatedCall = await ApiCall.findById(newCall._id).populate('apiId', 'name');

        res.status(201).json(populatedCall);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllApiCalls = async (req, res) => {
    try {
        const { limit = 20, apiId, startDate, endDate } = req.query;

        // First get user's APIs
        const Api = require('../models/Api');
        const userApis = await Api.find({ userId: req.user._id }).select('_id');
        const userApiIds = userApis.map(api => api._id);

        let query = { apiId: { $in: userApiIds } };

        if (apiId) query.apiId = apiId;
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const calls = await ApiCall.find(query)
            .populate('apiId', 'name')
            .sort({ createdAt: -1 })
            .limit(parseInt(limit));

        res.json(calls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUsageStats = async (req, res) => {
    try {
        const { days = 7 } = req.query;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(days));

        // First get user's APIs
        const Api = require('../models/Api');
        const userApis = await Api.find({ userId: req.user._id }).select('_id');
        const userApiIds = userApis.map(api => api._id);

        const dailyStats = await ApiCall.aggregate([
            { $match: { createdAt: { $gte: startDate }, apiId: { $in: userApiIds } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    calls: { $sum: 1 },
                    avgResponseTime: { $avg: "$responseTime" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const totalCalls = await ApiCall.countDocuments({
            createdAt: { $gte: startDate },
            apiId: { $in: userApiIds }
        });

        const avgResponse = await ApiCall.aggregate([
            { $match: { createdAt: { $gte: startDate }, apiId: { $in: userApiIds } } },
            { $group: { _id: null, avg: { $avg: "$responseTime" } } }
        ]);

        const errorCalls = await ApiCall.countDocuments({
            createdAt: { $gte: startDate },
            apiId: { $in: userApiIds },
            statusCode: { $gte: 400 }
        });

        res.json({
            dailyStats,
            totalCalls,
            avgResponseTime: avgResponse[0]?.avg || 0,
            errorRate: totalCalls > 0 ? (errorCalls / totalCalls) * 100 : 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
