import { Router } from 'express';
import {getServices, getServiceById, createService, updateService } from '../controllers/services.controller.js';

const router = Router();

router.get('/api/getServices',getServices);
router.get('/api/getService/:id',getServiceById);
router.post('/api/createService', createService);
router.put('/api/updateService/:id',updateService);


export default router;