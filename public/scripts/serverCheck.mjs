import pool from './pool.mjs';

const serverCheck = async () => { // checking the connection before the server starts

    try {
        const connection = await pool.getConnection();
        console.log('Database Server Connected! ✓ ');
    } catch (err) {
        console.error(err);
    }
}
export default serverCheck;