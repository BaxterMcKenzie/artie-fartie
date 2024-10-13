const express = require ('express')

const router = express.Router();

const { upload } = require('../config/cloudinary'); // Import the Cloudinary config

// Import controllers
const {
    getCrafts,
    getCraft,
    createCraft,
    deleteCraft,
    updateCraft
} = require('../controllers/craftController')


// Get all Crafts
router.get('/', getCrafts)

// Get single Craft
router.get('/:id', getCraft)

// Create Craft
router.post('/', upload.single('imageURL'), createCraft)

// Delete Craft
router.delete('/:id', deleteCraft)

// Update Craft
router.patch('/:id', updateCraft)

module.exports = router;