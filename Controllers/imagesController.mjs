import ImagesModel from "../Models/images.mjs";

class ImagesController {
    static async getAllImagesController(req, res) {
        try {
        const imagesModel = new ImagesModel();
        const images = await imagesModel.getAllImages();
        res.json(images);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }
    
    static async getImageByIdController(req, res) {
        const imageId = req.params.id;
    
        try {
        const imagesModel = new ImagesModel();
        const image = await imagesModel.getImageById(imageId);
        res.json(image);
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }
    
    static async addImageController(req, res) {
        const { base } = req.body;
    
        try {
        const imagesModel = new ImagesModel();
        const imageId = await imagesModel.addImage({
            base,
        });
        res.json({ imageId });
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }

    static async deleteImageController(req, res) {
        const imageId = req.params.id;
    
        try {
        const imagesModel = new ImagesModel();
        const affectedRows = await imagesModel.deleteImage(imageId);
    
        if (affectedRows > 0) {
            res.json({ message: 'Image deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Image not found.' });
        }
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
    }
}
export default ImagesController;