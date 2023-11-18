import express from 'express';
const Poirouter = express.Router();
import PointsOfInterestController from '../Controllers/poiControl.mjs';


Poirouter.get('/pointsOfInterest', PointsOfInterestController.getAllPointsOfInterestController);

Poirouter.post('/pointsOfInterest', PointsOfInterestController.addPointOfInterestController);

Poirouter.delete('/pointsOfInterest/:id', PointsOfInterestController.deletePointOfInterestController);

Poirouter.get('/pointsOfInterest/recommendations/:recommendations', PointsOfInterestController.getPointsOfInterestByRecommendationsController);

Poirouter.get('/pointsOfInterest/:id', PointsOfInterestController.getPointOfInterestByIdController);

//////////////// Swagger Annotations
//// Tag:
/** 
 * @swagger
 * tags:
 *  name: Point of Interest
 *  description: Point of Interest API management 
 *  
*/

/**
* @swagger
* /poi/pointsOfInterest:
*   get:
*     summary: Get all points of interest
*     tags: [Point of Interest]
*     description: Retrieve a list of all points of interest.
*     responses:
*       200:
*         description: Successful operation
*       400:
*         description: Bad request
*       404:
*         description: Not found
*       500:
*         description: Server error
*/
///////

export default Poirouter;
