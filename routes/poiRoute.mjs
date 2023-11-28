import express from 'express';
const router = express.Router();
import PointsOfInterestController from '../Controllers/poiControl.mjs';


router.get('/pointsOfInterest', PointsOfInterestController.getAllPointsOfInterestController);

router.get('/pointsOfInterestByRegion/:region', PointsOfInterestController.getPointOfInterestByRegionController);

//router.post('/pointsOfInterest/:name/:type/:country/:region/:lon/:lat/:description', PointsOfInterestController.addPointOfInterestController);

router.post('/pointsOfInterest', PointsOfInterestController.addPointOfInterestController);

router.delete('/pointsOfInterest/:id', PointsOfInterestController.deletePointOfInterestController);

router.get('/pointsOfInterest/recommendations/:recommendations', PointsOfInterestController.getPointsOfInterestByRecommendationsController);

router.get('/pointsOfInterest/:id', PointsOfInterestController.getPointOfInterestByIdController);

router.post('/recommend/:id', PointsOfInterestController.addRecomendationToPoi);

export default router;
