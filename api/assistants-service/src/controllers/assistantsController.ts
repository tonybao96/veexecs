import { Request, Response } from 'express';
import * as AssistantService from '../services/assistantService';

export async function createAssistant(req: Request, res: Response) {
    const { assistantType } = req.body; // Expect HR, Marketing, IT, Accounting etc

    if (!assistantType) {
        return res.status(400).send({ error: "Assistant type is required." });
    }
    
    try {
        const assistant = await AssistantService.createAssistant(assistantType);
        res.json(assistant);
    } catch (error: unknown) {
        console.error("Error creating HR assistant", error)
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
    }   
}

export async function getAssistant(req: Request, res: Response) {
    const { assistantId } = req.params; // Assuming the assistant ID is passed in the URL

    const result = await AssistantService.getAssistant(assistantId);
    if (result.success) {
        res.json(result.assistant);
    } else {
        console.error("Failed to retrieve assistant:", result.error);
        res.status(500).send("Failed to retrieve assistant.");
    }
}

export async function listAssistants(req: Request, res: Response): Promise<void> {
    // Convert limit to number, provide default if undefined or invalid
    const limit: number = parseInt(req.query.limit as string) || 20;

    const result = await AssistantService.listAssistants(limit);
    if (result.success) {
        res.json(result.assistants);
    } else {
        console.error("Failed to list assistants:", result.error);
        res.status(500).send("Failed to list assistants.");
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