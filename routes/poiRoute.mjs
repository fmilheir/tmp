import express from 'express';
const router = express.Router();
import PointsOfInterestController from '../Controllers/poiControl.mjs';


router.get('/pointsOfInterest', PointsOfInterestController.getAllPointsOfInterestController);

router.post('/pointsOfInterest', PointsOfInterestController.addPointOfInterestController);

router.delete('/pointsOfInterest/:id', PointsOfInterestController.deletePointOfInterestController);

router.get('/pointsOfInterest/recommendations/:recommendations', PointsOfInterestController.getPointsOfInterestByRecommendationsController);

router.get('/pointsOfInterest/:id', PointsOfInterestController.getPointOfInterestByIdController);

export default router;
