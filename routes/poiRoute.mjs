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


//////////////// Swagger Annotations
//// Schema:
/**
 * @swagger
 * components:
 *  schemas:
 *      PiointOfInterest:
 *          type: object
 *          required:
 *              - name
 *              - type
 *              - country
 *              - region
 *              - lon
 *              - lat
 *              - description
 *              - recommendations
 *              - image
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of the Point of Interest.
 *              type:
 *                  type: string
 *                  description: The type of the Point of Interest.
 *              country:
 *                  type: string
 *                  description: The country where the Point of Interest is.
 *              region:
 *                  type: string
 *                  description: The region where the Point of Interest is.
 *              lon:
 *                  type: decimal
 *                  description: The longitude of the Point of Interest.
 *              lat:
 *                  type: decimal
 *                  description: The latitude of the Point of Interest.
 *              description:
 *                  type: string
 *                  description: The description of the Point of Interest.
 *              recommendations:
 *                  type: string
 *                  description: The recommendations of the Point of Interest.
 *              image:
 *                  type: integer
 *                  description: The id of the image of the Point of Interest. 
 *          example:
 *              name: testuser
 *              type: testuser
 *              country: testuser
 *              region: testuser
 *              lon: 0.000000
 *              lat: 0.000000
 *              description: testuser
 *              recommendations: testuser
 *              image: 1
 */
//// Tag:
/** 
 * @swagger
 * tags:
 *  name: Point of Interest
 *  description: Point of Interest API management 
 *  
*/
///////// get all points of interest
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
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/PiointOfInterest'
*       400:
*         description: Bad request
*       404:
*         description: Not found
*       500:
*         description: Server error
*/
////// get a POI
/**
* @swagger
* /poi/pointsOfInterest/{id}:
*   get:
*     summary: Get a points of interest
*     tags: [Point of Interest]
*     description: Retrieve a list of all points of interest.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: The ID of the POI to retrieve.
*     responses:
*       200:
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/PiointOfInterest'
*       400:
*         description: Bad request
*       404:
*         description: Not found
*       500:
*         description: Server error
*/
//// get a POI by region
/**
* @swagger
* /poi/pointsOfInterestByRegion/{region}:
*   get:
*     summary: Get a points of interest
*     tags: [Point of Interest]
*     description: Retrieve a points of interest by region.
*     parameters:
*       - in: path
*         name: region
*         required: true
*         description: The region of the POI to retrieve.
*     responses:
*       200:
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/PiointOfInterest'
*       400:
*         description: Bad request
*       404:
*         description: Not found
*       500:
*         description: Server error
*/
///////
/**
 * @swagger
 * /poi/pointsOfInterest:
 *   post:
 *     summary: Create a new Point of Interest
 *     description: Create a new Point of Interest with the given attributes.
 *     tags:
 *       - Point of Interest
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/PiointOfInterest'
 *             
 *     responses:
 *       201:
 *         description: POI created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id:
 *                   type: string
 *                   description: The unique ID of the created POI.
 * 
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating an internal server error.
 */
/**
* @swagger
* /poi/pointsOfInterest/{id}:
*   delete:
*     summary: Delete a Point of Interest. 
*     tags: [Point of Interest]
*     description: This API will delete a particular Point of Interest.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: The ID of the POI to delete.
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Successful Deletiion

*       400:
*         description: Bad request
*       404:
*         description: Not found
*       500:
*         description: Server error
*/


export default router;
