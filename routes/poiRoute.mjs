import express from 'express';
const Poirouter = express.Router();
import PointsOfInterestController from '../Controllers/poiControl.mjs';


Poirouter.get('/pointsOfInterest', PointsOfInterestController.getAllPointsOfInterestController);

Poirouter.get('/pointsOfInterest/:region', PointsOfInterestController.getPointOfInterestByRegionController);

//Poirouter.post('/pointsOfInterest/:name/:type/:country/:region/:lon/:lat/:description', PointsOfInterestController.addPointOfInterestController);

Poirouter.post('/pointsOfInterest', PointsOfInterestController.addPointOfInterestController);

Poirouter.delete('/pointsOfInterest/:id', PointsOfInterestController.deletePointOfInterestController);

Poirouter.get('/pointsOfInterest/recommendations/:recommendations', PointsOfInterestController.getPointsOfInterestByRecommendationsController);

Poirouter.get('/pointsOfInterest/:id', PointsOfInterestController.getPointOfInterestByIdController);

Poirouter.post('/recommend/:id', PointsOfInterestController.addRecomendationToPoi);

export default Poirouter;
