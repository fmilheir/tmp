import express from 'express';
const router = express.Router();
import PointsOfInterestController from '../Controllers/poiControl.mjs';
import { isAuthenticated, isAdmin } from '../middleware/auth.mjs';

router.get('/pointsOfInterest', isAuthenticated,PointsOfInterestController.getAllPointsOfInterestController);

router.get('/pointsOfInterestByRegion/:region', PointsOfInterestController.getPointOfInterestByRegionController);

//router.post('/pointsOfInterest/:name/:type/:country/:region/:lon/:lat/:description', PointsOfInterestController.addPointOfInterestController);

router.post('/pointsOfInterest',isAuthenticated, PointsOfInterestController.addPointOfInterestController);

router.delete('/pointsOfInterest/:id', isAdmin,PointsOfInterestController.deletePointOfInterestController);

router.get('/pointsOfInterest/recommendations/:recommendations', PointsOfInterestController.getPointsOfInterestByRecommendationsController);

router.get('/pointsOfInterest/:id', PointsOfInterestController.getPointOfInterestByIdController);

router.post('/recommend',isAuthenticated,  PointsOfInterestController.addRecomendationToPoi);

export default router;
