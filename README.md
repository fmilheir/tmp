# Devops_com619
Devopers

added stuff to search a poi by region 
    - create a new function in poiControler

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

    - create a new call to the db to get the proper data on the poiModel

        async getPointOfInterestByRegion(pointOfInterestRegiom) {
            try {
            const query = 'SELECT * FROM point_of_interest WHERE region = ?';
            const [rows] = await pool.query(query, [pointOfInterestRegiom]);
            return rows;
            } catch (error) {
            throw error;
            }
        }

    - added a new route to be able to get all the data

        Poirouter.get('/pointsOfInterest/:region', PointsOfInterestController.getPointOfInterestByRegionController);


Added stuff to manage the recomendation 

    - create a new function in poiControler

        static async addRecomendationToPoi(req, res) {
        const poiID = req.body.poi_id
    
        try {
            const pointsOfInterestModel = new PointsOfInterestModel();
            const pointOfInterestId = await pointsOfInterestModel.addRecomendationToPoi({poiID});
            res.json({ pointOfInterestId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
        }

    - create a new call to the db to get the proper data on the poiModel

        async addRecomendationToPoi(poiID) {
        try {
          const query = `UPDATE point_of_interest SET recommendations=recommendations+1 WHERE id=?`;
          const [rows] = await pool.query(query, [poiID]);
          return rows;
        } catch (error) {
          throw error;
        }
      }

    - added a new route to be able to get all the data

        Poirouter.post('/recommend', PointsOfInterestController.addRecomendationToPoi);

    - data base type needs to be changed to Int and not text





