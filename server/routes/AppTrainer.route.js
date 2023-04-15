import { Router } from 'express';
const router = Router();
import { approveApplicant } from '../controllers/myController';

// Route to approve an applicant
router.put('/applicants/:email', approveApplicant);

export default router;
