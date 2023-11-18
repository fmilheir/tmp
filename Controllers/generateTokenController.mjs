import crypto from 'crypto';

// Function to generate a unique token 
export function generateToken() {
    const token = crypto.randomBytes(32).toString('hex');
    return token;
};
// generateTokenController.mjs
export function generateVerificationCode() {
    const token = Math.floor(100000 + Math.random() * 900000);
    return token.toString();
};


