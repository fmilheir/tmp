import pool from '../public/scripts/pool.mjs';

class user{

    getAllUsers = async (req, res) => {
        try {
          const [rows] = await pool.query('SELECT * FROM users');
            return rows;
        } catch (err) {
          console.error(err);
        }
    };
    // write any database queries here withing a function! make sure it is async!!!

}export default user;