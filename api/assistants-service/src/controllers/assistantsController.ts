import { Request, Response } from 'express';
import * as AssistantService from '../services/assistantService';

export async function createAssistant(req: Request, res: Response) {
    try {
        const assistant = await AssistantService.createAssistant();
        res.json(assistant);
    } catch (error: unknown) {
        console.error("Error creating HR assistant", error)
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
    }   
}

export async function createThread(req: Request, res: Response) {
    try {
      const thread = await AssistantService.createThread();
      res.json(thread);
    } catch (error: unknown) {
      console.error("Error creating thread:", error);
      if (error instanceof Error) {
        res.status(500).send(error.message);
    }
    }
  }

export async function addMessage(req: Request, res: Response) {
    const {threadId} = req.params;
    const {content} = req.body;
    const result = await AssistantService.addMessageToThread(threadId, content);
    if (result.success) {
        res.json(result.message);
    } else {
        console.error("Failed to add message:", result.error);
        res.status(500).send("Failed to add message.");
    }
}
export async function runThread(req: Request, res: Response) {
    const { threadId, assistantId } = req.params;
    const { instructions } = req.body;

    if (!threadId || !assistantId) {
        return res.status(400).send({ error: 'Thread ID and Assistant ID are required.' });
    }
    
    const result = await AssistantService.runThread(threadId, assistantId, instructions);
    if (result.success) {
      res.json(result.run);
    } else {
      console.error("Failed to run thread:", result.error);
      res.status(500).send("Failed to run thread.");
    }
  }
  
export async function listThreadMessages(req: Request, res: Response) {
    const { threadId } = req.params;
    const result = await AssistantService.listMessages(threadId);
    if (result.success) {
        res.json(result.messages);
    } else {
        console.error("Failed to list messages:", result.error);
        res.status(500).send("Failed to list messages.");
    }
}


// Add more controller functions here for creating threads, adding messages, etc.