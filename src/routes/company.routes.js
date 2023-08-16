import { Router } from 'express';
import { getCompanies, getCompanyById, createCompany, updateCompany, deleteCompany} from '../controllers/company.controller.js';

const router = Router();

router.get('/api/getCompanies',getCompanies);
router.get('/api/getCompany/:id',getCompanyById);
router.post('/api/createCompany', createCompany);
router.put('/api/updateCompany/:id',updateCompany);
router.delete('/api/deleteCompany/:id', deleteCompany);

export default router;
 