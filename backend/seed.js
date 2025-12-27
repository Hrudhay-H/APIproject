require('dotenv').config();
const mongoose = require('mongoose');
const Api = require('./models/Api');
const ApiCall = require('./models/ApiCall');
const Settings = require('./models/Settings');
const connectDB = require('./config/db');

const seedData = async () => {
    try {
        await connectDB();

        console.log('Clearing existing data...');
        await Api.deleteMany();
        await ApiCall.deleteMany();
        await Settings.deleteMany();

        console.log('Creating APIs...');
        const apis = await Api.insertMany([
            { name: 'OpenAI API', baseUrl: 'https://api.openai.com', monthlyCost: 150, color: '#10b981' },
            { name: 'Stripe Payments', baseUrl: 'https://api.stripe.com', monthlyCost: 80, color: '#3b82f6' },
            { name: 'SendGrid Email', baseUrl: 'https://api.sendgrid.com', monthlyCost: 45, color: '#8b5cf6' },
            { name: 'Twilio SMS', baseUrl: 'https://api.twilio.com', monthlyCost: 60, color: '#f59e0b' }
        ]);

        console.log('Creating API calls...');
        const calls = [];
        for (let i = 0; i < 100; i++) {
            calls.push({
                apiId: apis[Math.floor(Math.random() * apis.length)]._id,
                endpoint: '/v1/endpoint',
                method: ['GET', 'POST', 'PUT'][Math.floor(Math.random() * 3)],
                statusCode: Math.random() > 0.9 ? 500 : 200,
                responseTime: Math.floor(Math.random() * 300) + 50,
                createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
            });
        }
        await ApiCall.insertMany(calls);

        console.log('Creating settings...');
        await Settings.create({ monthlyBudget: 500, alertThreshold: 0.8 });

        console.log('✓ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
};

seedData();
