import pool from "../public/scripts/pool.mjs";

class ImagesModel {

    async getAllImages() {
        try {
          const [rows] = await pool.query('SELECT * FROM images');
          return rows;
        } catch (error) {
          throw error;
        }
      }

    async getImageById(imageId) {
        try {
          const query = 'SELECT * FROM images WHERE id = ?';
          const [rows] = await pool.query(query, [imageId]);
          return rows[0];
        } catch (error) {
          throw error;
        }
      }

    async addImage({ base }) {
        try {
            const query = `
              INSERT INTO images (base)
              VALUES (?)
            `;
      
            const [result] = await pool.query(query, [base]);
      
            return result.insertId;
          } catch (error) {
            throw error;
          }
    }

    async deleteImage(imageId) {
        try {
          const query = 'DELETE FROM images WHERE id = ?';
          const [result] = await pool.query(query, [imageId]);
          return result.affectedRows;
        } catch (error) {
          throw error;
        }
      }

    
}
export default ImagesModel;