import express from 'express';
const router = express.Router();

import {
    createSector,
    getAllSector,
    showStats,
    bookSector,
    updateSector,
    deleteSector
} from '../controllers/sectorController.js';


router.route('/').post(createSector).get(getAllSector)
router.route('/stats').get(showStats)
router.route('/uploadfile').post(bookSector)
router.route('/:id').patch(updateSector).delete(deleteSector)


export default router