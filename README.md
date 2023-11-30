# Devops_com619
Devopers

The guest can search for a POI.  get a result but can not add to the list of POI 
The user can add, search and upload pictures to the POI, edit his profile
But the admin can delete a user, delete a POI but can not edit, can delete a user edit some information on the users profile except the users password, email address and the ID

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

        Poirouter.get('/pointsOfInterestByRegion/:region', PointsOfInterestController.getPointOfInterestByRegionController);


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


added stuff to verify user logged on on sessions 

    -added to controll(it was the way i managed to get the sessions and use them in JS)

        static verifyLoguin(req, res) {
            res.json({ username: req.session.usernamename || null });
        }

    -added route to be abe to call it on the JS
        router.get('/verifylogin', userController.verifyLoguin);





