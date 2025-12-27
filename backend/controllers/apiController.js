const Api = require('../models/Api');
const { encrypt, decrypt, maskApiKey } = require('../services/encryptionService');

exports.getAllApis = async (req, res) => {
    try {
        const apis = await Api.find({ userId: req.user._id }).sort({ createdAt: -1 });

        // Add masked API key indicator
        const apisWithMask = apis.map(api => ({
            ...api.toObject(),
            hasApiKey: !!(api.apiKey),
            apiKeyMasked: api.apiKey ? '****' : null
        }));

        res.json(apisWithMask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getApiById = async (req, res) => {
    try {
        const api = await Api.findOne({ _id: req.params.id, userId: req.user._id });
        if (!api) {
            return res.status(404).json({ message: 'API not found' });
        }

        const apiObj = api.toObject();
        apiObj.hasApiKey = !!api.apiKey;
        apiObj.apiKeyMasked = api.apiKey ? '****' : null;

        res.json(apiObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createApi = async (req, res) => {
    try {
        const {
            name, baseUrl, monthlyCost,
            apiKeyPlain, authType, authHeaderName,
            environment, version, docsUrl, tags, notes,
            rateLimit
        } = req.body;

        const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Encrypt API key if provided
        let apiKey = null;
        let apiKeyIV = null;
        if (apiKeyPlain) {
            const encrypted = encrypt(apiKeyPlain);
            apiKey = encrypted.encryptedData;
            apiKeyIV = encrypted.iv;
        }

        const api = new Api({
            userId: req.user._id,
            name,
            baseUrl,
            monthlyCost,
            color: randomColor,
            apiKey,
            apiKeyIV,
            authType: authType || 'none',
            authHeaderName: authHeaderName || 'Authorization',
            environment: environment || 'production',
            version: version || 'v1',
            docsUrl,
            tags: tags || [],
            notes,
            rateLimit: rateLimit || { requestsPerMinute: 0, requestsPerDay: 0, requestsPerMonth: 0 }
        });

        const newApi = await api.save();

        const apiObj = newApi.toObject();
        apiObj.hasApiKey = !!newApi.apiKey;
        apiObj.apiKeyMasked = newApi.apiKey ? '****' : null;

        res.status(201).json(apiObj);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateApi = async (req, res) => {
    try {
        const { apiKeyPlain, ...updateData } = req.body;

        // Encrypt new API key if provided
        if (apiKeyPlain) {
            const encrypted = encrypt(apiKeyPlain);
            updateData.apiKey = encrypted.encryptedData;
            updateData.apiKeyIV = encrypted.iv;
        }

        const api = await Api.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            updateData,
            { new: true, runValidators: true }
        );

        if (!api) {
            return res.status(404).json({ message: 'API not found' });
        }

        const apiObj = api.toObject();
        apiObj.hasApiKey = !!api.apiKey;
        apiObj.apiKeyMasked = api.apiKey ? '****' : null;

        res.json(apiObj);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteApi = async (req, res) => {
    try {
        const api = await Api.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

        if (!api) {
            return res.status(404).json({ message: 'API not found' });
        }

        res.json({ message: 'API deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// New endpoint: Reveal API key (requires confirmation)
exports.revealApiKey = async (req, res) => {
    try {
        const api = await Api.findOne({ _id: req.params.id, userId: req.user._id })
            .select('+apiKey +apiKeyIV');

        if (!api) {
            return res.status(404).json({ message: 'API not found' });
        }

        if (!api.apiKey) {
            return res.status(404).json({ message: 'No API key stored for this service' });
        }

        const decryptedKey = decrypt(api.apiKey, api.apiKeyIV);

        res.json({ apiKey: decryptedKey });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// New endpoint: Remove API key
exports.removeApiKey = async (req, res) => {
    try {
        const api = await Api.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { $unset: { apiKey: 1, apiKeyIV: 1 }, authType: 'none' },
            { new: true }
        );

        if (!api) {
            return res.status(404).json({ message: 'API not found' });
        }

        res.json({ message: 'API key removed successfully', api });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};