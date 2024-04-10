import { Router } from 'express';
import * as AssistantsController from '../controllers/assistantsController';

const router = Router();

router.post('/create', AssistantsController.createAssistant);
// Define more routes for your other endpoints

export default router;