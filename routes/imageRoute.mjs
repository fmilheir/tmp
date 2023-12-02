import express from 'express';
const router = express.Router();
import ImagesController from '../Controllers/imagesController.mjs';

router.get('/allimages', ImagesController.getAllImagesController);

router.get('/images/:id', ImagesController.getImageByIdController);

router.post('/imagesadd', ImagesController.addImageController);
/// when doing front end, the image should be added first to the database,
/// then return the id of the image, and then add the point of interest with the id of the image

router.delete('/images/:id', ImagesController.deleteImageController);

/// Schema:
/**
 * @swagger
 * components:
 *  schemas:
 *      Image:
 *          type: object
 *          required:
 *              - base
 *          properties:
 *              base:
 *                  type: blob
 *                  description: The base64 representation of the image. 
 *          example:
 *              base: base64AndRandomCharacters
 */
//// Tag:
/** 
 * @swagger
 * tags:
 *  name: Images
 *  description: Images API management 
 *  
*/
///////// get all points of interest
/**
* @swagger
* /image/allimages:
*   get:
*     summary: Get all Images. 
*     tags: [Images]
*     description: Retrieve a list of all Images.
*     responses:
*       200:
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Image'
*       400:
*         description: Bad request
*       404:
*         description: Not found
*       500:
*         description: Server error
*/
//// get one image
/**
* @swagger
* /image/images/{id}:
*   get:
*     summary: Get an Images. 
*     tags: [Images]
*     description: Retrieve a list of all Images.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: The ID of the image to retrieve.
*     responses:
*       200:
*         description: Successful operation
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Image'
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
 * /image/imagesadd:
 *   post:
 *     summary: Create a new Image.
 *     description: Create a new Image with the given attribute.
 *     tags:
 *       - Images
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/Image'
 *             
 *     responses:
 *       201:
 *         description: Image created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Id:
 *                   type: string
 *                   description: The unique ID of the created Image.
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
* /image/images/{id}:
*   delete:
*     summary: Delete an Images. 
*     tags: [Images]
*     description: This API will delete a particular image.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: The ID of the image to delete.
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