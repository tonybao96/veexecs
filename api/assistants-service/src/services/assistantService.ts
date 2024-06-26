import 'dotenv/config';
import OpenAI from 'openai';
import { ASSISTANT_PROMPTS } from '../initializationPrompts';

const openai = new OpenAI({ apiKey: process.env.OPENAI_SECRET_KEY });

export async function createAssistant(assistantType: string) {
    const assistantDetails = ASSISTANT_PROMPTS[assistantType as keyof typeof ASSISTANT_PROMPTS];

    if (!assistantDetails) {
        throw new Error("Invalid assistant type provided.");
    }

    try {
        const thread = await openai.beta.threads.create();
        const assistant = await openai.beta.assistants.create({
            instructions: assistantDetails.instructions,
            name: assistantDetails.nameSuffix,
            model: "gpt-3.5-turbo",
        });

        assistant.metadata = {
            threadId: thread.id
        }

        return {success: true, assistant};
    } catch (error) {
        console.error("Error creating HR Employee assistant:", error);
        return { success: false, error};
    }
}

export async function getAssistant(assistantId: string) {
    try {
        const assistant = await openai.beta.assistants.retrieve(assistantId);
        return { success: true, assistant };
    } catch (error) {
        console.error("Error retrieving assistant:", error);
        return { success: false, error };
    }
}

export async function listAssistants(limit: number = 20) {
    try {
        const assistants = await openai.beta.assistants.list({
            limit: limit
        });
        return { success: true, assistants: assistants.data };
    } catch (error) {
        console.error("Error listing assistants:", error);
        return { success: false, error };
    }
}

export async function addMessageToThread(threadId: string, content: string) {
try {
    const message = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content
    });
    return { success: true, message };
} catch (error) {
    console.error("Error adding message to thread:", error);
    return { success: false, error };
}
}

export async function runThread(threadId: string, assistantId: string, instructions: string) {
    try {
      const run = await openai.beta.threads.runs.createAndPoll(threadId, {
        assistant_id: assistantId,
        instructions: instructions
      });
      return { success: true, run };
    } catch (error) {
      console.error("Error running thread:", error);
      return { success: false, error };
    }
  }
  
export async function listMessages(threadId: string) {
    try {
        const messages = await openai.beta.threads.messages.list(threadId);
        return { success: true, messages: messages.data.reverse() };
    } catch (error) {
        console.error("Error listing messages:", error);
        return { success: false, error };
    }
}


// Define more service functions as needed for threads, messages, etc.
