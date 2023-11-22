import { generateToken, generateVerificationCode } from '../Controllers/generateTokenController.mjs';

describe('Generate Token test', () => {
    // Generates a verification code with 6 digits
    it('should generate a verification code with 6 digits', () => {
        const verificationCode = generateVerificationCode();
        expect(verificationCode.length).toBe(6);
    });
    // Returns the verification code as a string
    it('should return the verification code as a string', () => {
        const verificationCode = generateVerificationCode();
        expect(typeof verificationCode).toBe('string');
    });
    // The verification code is a random number between 100000 and 999999
    it('should generate a verification code between 100000 and 999999', () => {
        const verificationCode = generateVerificationCode();
        expect(Number(verificationCode)).toBeGreaterThanOrEqual(100000);
        expect(Number(verificationCode)).toBeLessThanOrEqual(999999);
    });
    // Returns a string
    it('should return a string', () => {
        const verificationCode = generateVerificationCode();
        expect(typeof verificationCode).toBe('string');
    });
    // Returns a number as a string
    it('should return a number as a string', () => {
        const verificationCode = generateVerificationCode();
        expect(Number(verificationCode)).not.toBeNaN();
    });
    // Returns a different verification code on each call
    it('should return a different verification code on each call', () => {
        const verificationCode1 = generateVerificationCode();
        const verificationCode2 = generateVerificationCode();
        expect(verificationCode1).not.toBe(verificationCode2);
      });
})