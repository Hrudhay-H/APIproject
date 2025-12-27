const crypto = require('crypto');

// Encryption key from environment variable
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-secret-key!!'; // Must be 32 characters
const ALGORITHM = 'aes-256-cbc';

// Ensure key is exactly 32 bytes
const getKey = () => {
    const key = Buffer.from(ENCRYPTION_KEY);
    if (key.length !== 32) {
        throw new Error('Encryption key must be exactly 32 characters');
    }
    return key;
};

/**
 * Encrypt sensitive data (like API keys)
 * @param {string} text - Plain text to encrypt
 * @returns {object} - { encryptedData, iv }
 */
const encrypt = (text) => {
    if (!text) return { encryptedData: null, iv: null };

    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return {
            encryptedData: encrypted,
            iv: iv.toString('hex')
        };
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt data');
    }
};

/**
 * Decrypt sensitive data
 * @param {string} encryptedData - Encrypted hex string
 * @param {string} iv - Initialization vector (hex string)
 * @returns {string} - Decrypted plain text
 */
const decrypt = (encryptedData, iv) => {
    if (!encryptedData || !iv) return null;

    try {
        const decipher = crypto.createDecipheriv(
            ALGORITHM,
            getKey(),
            Buffer.from(iv, 'hex')
        );

        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt data');
    }
};

/**
 * Mask sensitive data for display
 * @param {string} text - Text to mask
 * @returns {string} - Masked text (e.g., "sk-****abc123")
 */
const maskApiKey = (text) => {
    if (!text) return '';
    if (text.length <= 8) return '****';

    const start = text.substring(0, 4);
    const end = text.substring(text.length - 4);
    return `${start}****${end}`;
};

module.exports = {
    encrypt,
    decrypt,
    maskApiKey
};
