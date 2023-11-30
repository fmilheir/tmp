import PointsOfInterestModel from '../Models/poiModel.mjs';

class PointsOfInterestController {
    static async getAllPointsOfInterestController(req, res) {
      try {
        const pointsOfInterestModel = new PointsOfInterestModel();
        const pointsOfInterest = await pointsOfInterestModel.getAllPointsOfInterest();
        res.json(pointsOfInterest);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    static async addPointOfInterestController(req, res) {
      const {name, type, country, region, lon, lat, description, recommendations, image} = req.body
  
      try {
        const pointsOfInterestModel = new PointsOfInterestModel();
        const pointOfInterestId = await pointsOfInterestModel.addPointOfInterest({
          name,
          type,
          country,
          region,
          lon,
          lat,
          description,
          recommendations,
          image
        });
        res.json({ pointOfInterestId });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    static async deletePointOfInterestController(req, res) {
      const pointOfInterestId = req.params.id;
  
      try {
        const pointsOfInterestModel = new PointsOfInterestModel();
        const affectedRows = await pointsOfInterestModel.deletePointOfInterest(pointOfInterestId);
  
        if (affectedRows > 0) {
          res.json({ message: 'Point of interest deleted successfully.' });
        } else {
          res.status(404).json({ error: 'Point of interest not found.' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }

    static async getPointsOfInterestByRecommendationsController(req, res) {
        const recommendations = req.params.recommendations;
    
        try {
          const pointsOfInterestModel = new PointsOfInterestModel();
          const pointsOfInterest = await pointsOfInterestModel.getPointsOfInterestByRecommendations(recommendations);
          res.json(pointsOfInterest);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }
    
    static async getPointOfInterestByIdController(req, res) {
        const pointOfInterestId = req.params.id;
    
        try {
          const pointsOfInterestModel = new PointsOfInterestModel();
          const pointOfInterest = await pointsOfInterestModel.getPointOfInterestById(pointOfInterestId);
    
          if (pointOfInterest) {
            res.json(pointOfInterest);
          } else {
            res.status(404).json({ error: 'Point of interest not found.' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

    static async getPointOfInterestByRegionController(req, res) {
        const pointOfInterestRegion = req.params.region;
    
        try {
          const pointsOfInterestModel = new PointsOfInterestModel();
          const pointOfInterest = await pointsOfInterestModel.getPointOfInterestByRegion(pointOfInterestRegion);
    
          if (pointOfInterest) {
            res.json(pointOfInterest);
          } else {
            res.status(404).json({ error: 'Point of interest not found.' });
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
    }

    static async addRecomendationToPoi(req, res) {
      const poiID = req.params.id
  
      try {
        const pointsOfInterestModel = new PointsOfInterestModel();
        const pointOfInterestId = await pointsOfInterestModel.addRecomendationToPoi({poiID});
        res.json({ pointOfInterestId });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }



      
  }
  
  export default PointsOfInterestController;