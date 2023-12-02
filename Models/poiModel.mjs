import pool from '../public/scripts/pool.mjs';

class PointsOfInterestModel {
    // Retrieve all points of interest
    async getAllPointsOfInterest() {
      try {
        const [rows] = await pool.query('SELECT * FROM point_of_interest');
        return rows;
      } catch (error) {
        throw error;
      }
    }
  
    // Add a new point of interest

    async addPointOfInterest({ name, type, country, region, lon, lat, description, recommendations }) {
      try {
        const query = `
          INSERT INTO point_of_interest (name, type, country, region, lon, lat, description, recommendations)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
  
        const [result] = await pool.query(query, [name, type, country, region, lon, lat, description, recommendations]);

        return result.insertId;
      } catch (error) {
        throw error;
      }
    }
  
    // Delete a point of interest by ID
    async deletePointOfInterest(pointOfInterestId) {
      try {
        const query = 'DELETE FROM point_of_interest WHERE id = ?';
        const [result] = await pool.query(query, [pointOfInterestId]);
        return result.affectedRows;
      } catch (error) {
        throw error;
      }
    }

    async getPointsOfInterestByRecommendations(recommendations) {
        try {
          const query = 'SELECT * FROM point_of_interest WHERE recommendations = ?';
          const [rows] = await pool.query(query, [recommendations]);
          return rows;
        } catch (error) {
          throw error;
        }
      }
    
      // Get a point of interest by ID
      async getPointOfInterestById(pointOfInterestId) {
        try {
          const query = 'SELECT * FROM point_of_interest WHERE id = ?';
          const [rows] = await pool.query(query, [pointOfInterestId]);
          return rows[0];
        } catch (error) {
          throw error;
        }
      }

      // Get a point of interest by Region
      async getPointOfInterestByRegion(pointOfInterestRegiom) {
        try {
          const query = 'SELECT * FROM point_of_interest WHERE region = ?';
          const [rows] = await pool.query(query, [pointOfInterestRegiom]);
          return rows;
        } catch (error) {
          throw error;
        }
      }

      // Add a recomendation to a specific poi
      async addRecomendationToPoi(poiID) {
        try {
          const query = `UPDATE point_of_interest SET recommendations=recommendations+1 WHERE id=?`;
          const [rows] = await pool.query(query, [poiID]);
          return rows;
        } catch (error) {
          throw error;
        }
      }
  }
  
  export default PointsOfInterestModel;