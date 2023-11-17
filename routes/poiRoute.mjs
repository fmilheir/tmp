import express from 'express';
const Poirouter = express.Router();
import PointsOfInterestController from '../Controllers/poiControl.mjs';


Poirouter.get('/pointsOfInterest', PointsOfInterestController.getAllPointsOfInterestController);

Poirouter.post('/pointsOfInterest', PointsOfInterestController.addPointOfInterestController);

Poirouter.delete('/pointsOfInterest/:id', PointsOfInterestController.deletePointOfInterestController);

Poirouter.get('/pointsOfInterest/recommendations/:recommendations', PointsOfInterestController.getPointsOfInterestByRecommendationsController);

Poirouter.get('/pointsOfInterest/:id', PointsOfInterestController.getPointOfInterestByIdController);

export default Poirouter;
