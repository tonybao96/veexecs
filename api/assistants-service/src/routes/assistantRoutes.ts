import { Router } from 'express';
import * as AssistantsController from '../controllers/assistantsController';

const router = Router();

router.post('/assistants', AssistantsController.createAssistant);
router.post('/threads/:threadId/messages', AssistantsController.addMessage);
router.post('/threads/:threadId/assistants/:assistantId/run', AssistantsController.runThread);
router.get('/threads/:threadId/messages',AssistantsController.listThreadMessages);
// Define more routes for your other endpoints

export default router;