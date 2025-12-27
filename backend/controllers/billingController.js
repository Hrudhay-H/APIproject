const Api = require('../models/Api');
const Settings = require('../models/Settings');
const { sendBudgetAlert } = require('../services/emailService');

exports.getBillingSummary = async (req, res) => {
    try {
        const apis = await Api.find({ status: 'active', userId: req.user._id });
        let settings = await Settings.findOne({ userId: req.user._id });

        if (!settings) {
            settings = { monthlyBudget: 500, alertThreshold: 80 };
        }

        const totalCost = apis.reduce((sum, api) => sum + api.monthlyCost, 0);
        const budgetUsed = settings.monthlyBudget > 0 ? parseFloat(((totalCost / settings.monthlyBudget) * 100).toFixed(2)) : 0;

        const costByApi = apis.map(api => ({
            name: api.name,
            cost: parseFloat(api.monthlyCost.toFixed(2)),
            percentage: totalCost > 0 ? parseFloat(((api.monthlyCost / totalCost) * 100).toFixed(2)) : 0
        }));

        // Check if budget alert should be sent
        if (settings.emailAlerts && settings.emailAlerts.enabled &&
            budgetUsed >= settings.alertThreshold &&
            !settings.emailAlerts.budgetAlertSent) {

            // Send email alert
            const emailResult = await sendBudgetAlert(settings.emailAlerts.email, {
                totalCost,
                monthlyBudget: settings.monthlyBudget,
                budgetUsed
            });

            if (emailResult.success) {
                // Mark alert as sent
                settings.emailAlerts.budgetAlertSent = true;
                await settings.save();
                console.log('Budget alert email sent successfully');
            }
        }

        // Reset alert flag if budget usage drops below threshold
        if (settings.emailAlerts && budgetUsed < settings.alertThreshold && settings.emailAlerts.budgetAlertSent) {
            settings.emailAlerts.budgetAlertSent = false;
            await settings.save();
        }

        res.json({
            totalCost,
            monthlyBudget: settings.monthlyBudget,
            budgetUsed,
            costByApi,
            alertThreshold: settings.alertThreshold
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne({ userId: req.user._id });
        if (!settings) {
            settings = await Settings.create({
                userId: req.user._id,
                monthlyBudget: 500,
                alertThreshold: 80,
                userProfile: {
                    name: req.user.name,
                    email: req.user.email,
                    organization: 'Antigravity Inc.',
                    plan: 'Professional'
                }
            });
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne({ userId: req.user._id });
        if (!settings) {
            settings = new Settings({ ...req.body, userId: req.user._id });
        } else {
            Object.assign(settings, req.body);
        }
        await settings.save();
        res.json(settings);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
