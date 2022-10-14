import express from 'express';
const router = express.Router();

import {
    createSector,
    getAllSector,
    showStats,
    updateSector,
    deleteSector
} from '../controllers/sectorController.js';

router.route('/').post(createSector).get(getAllSector)
router.route('/stats').get(showStats)
router.route('/:id').patch(updateSector).delete(deleteSector)


export default router