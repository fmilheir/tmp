import express from 'express';
const router = express.Router();
import PointsOfInterestController from '../Controllers/poiControl.mjs';


Poirouter.get('/pointsOfInterest', PointsOfInterestController.getAllPointsOfInterestController);

Poirouter.get('/pointsOfInterestByRegion/:region', PointsOfInterestController.getPointOfInterestByRegionController);

//Poirouter.post('/pointsOfInterest/:name/:type/:country/:region/:lon/:lat/:description', PointsOfInterestController.addPointOfInterestController);

router.post('/pointsOfInterest', PointsOfInterestController.addPointOfInterestController);

router.delete('/pointsOfInterest/:id', PointsOfInterestController.deletePointOfInterestController);

router.get('/pointsOfInterest/recommendations/:recommendations', PointsOfInterestController.getPointsOfInterestByRecommendationsController);

Poirouter.get('/pointsOfInterest/:id', PointsOfInterestController.getPointOfInterestByIdController);

Poirouter.post('/recommend/:id', PointsOfInterestController.addRecomendationToPoi);

export default router;
