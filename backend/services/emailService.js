const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'your-email@gmail.com',
            pass: process.env.EMAIL_PASS || 'your-app-password'
        }
    });
};

// Send budget alert email
const sendBudgetAlert = async (to, budgetData) => {
    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER || 'API Analytics Dashboard <noreply@antigravity.dev>',
            to: to,
            subject: '⚠️ Budget Alert: Threshold Exceeded',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #FF6D1F 0%, #222222 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0;">⚠️ Budget Alert</h1>
                    </div>
                    
                    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                        <p style="font-size: 16px; color: #333;">Hello,</p>
                        
                        <p style="font-size: 16px; color: #333;">
                            Your API usage costs have exceeded the configured budget threshold.
                        </p>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF6D1F;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 10px 0; color: #666;">Total Cost:</td>
                                    <td style="padding: 10px 0; color: #FF6D1F; font-weight: bold; font-size: 18px; text-align: right;">$${budgetData.totalCost}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #666;">Monthly Budget:</td>
                                    <td style="padding: 10px 0; color: #333; font-weight: bold; text-align: right;">$${budgetData.monthlyBudget}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0; color: #666; border-top: 1px solid #eee; padding-top: 15px;">Budget Used:</td>
                                    <td style="padding: 10px 0; color: #FF6D1F; font-weight: bold; font-size: 20px; text-align: right; border-top: 1px solid #eee; padding-top: 15px;">${budgetData.budgetUsed.toFixed(1)}%</td>
                                </tr>
                            </table>
                        </div>
                        
                        <p style="font-size: 14px; color: #666;">
                            Please review your API usage and consider adjusting your budget or optimizing your API calls.
                        </p>
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="http://localhost:3000/billing" style="background: #FF6D1F; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">View Billing Dashboard</a>
                        </div>
                        
                        <p style="font-size: 12px; color: #999; margin-top: 30px; text-align: center;">
                            This is an automated message from API Analytics Dashboard
                        </p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Budget alert email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending budget alert email:', error);
        return { success: false, error: error.message };
    }
};

module.exports = {
    sendBudgetAlert
};
