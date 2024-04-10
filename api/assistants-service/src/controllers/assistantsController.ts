import { Request, Response } from 'express';
import * as AssistantService from '../services/assistantService';

export async function createAssistant(req: Request, res: Response) {
  try {
    const assistant = await AssistantService.createAssistant();
    res.json(assistant);
  } catch (error: unknown) {
    
    if (error instanceof Error) {
        res.status(500).send(error.message);
    }
   }   
}

// Add more controller functions here for creating threads, adding messages, etc.