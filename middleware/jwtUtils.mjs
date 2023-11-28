import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;

export function signToken(payload, options) {
    return jwt.sign(payload, privateKey, options);
}

export function verifyToken(token) {
    return jwt.verify(token, publicKey);
}

export function encryptToken(payload, options) {
    return jwt.sign(payload, privateKey, { algorithm: 'HS256', ...options });
}

export function decryptToken(encryptedToken) {
    return jwt.verify(encryptedToken, publicKey);
}
