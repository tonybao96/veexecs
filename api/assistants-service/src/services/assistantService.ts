import 'dotenv/config';
import OpenAI from 'openai';
import { hrAssistantPrompt } from '../initializationPrompts';

const openai = new OpenAI({ apiKey: process.env.OPENAI_SECRET_KEY });

export async function createAssistant() {
  // Your logic to create an assistant
  try {
    const assistant = await openai.beta.assistants.create({
      instructions: hrAssistantPrompt,
      name: "HR Employee Assistant",
      model: "gpt-3.5-turbo",
    });

    return assistant;

  } catch (error) {
    console.error("Error creating HR Employee assistant:", error);
  }
}

// Define more service functions as needed for threads, messages, etc.
