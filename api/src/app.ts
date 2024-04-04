import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';

import { hrAssistantPrompt } from './initializationPrompts';


const app = express();
app.use(express.json());

// Assuming OPENAI_SECRET_KEY is in your .env file
const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

app.post('/create-hr-employee', async (req, res) => {
  try {
    const assistant = await openai.beta.assistants.create({
      instructions: hrAssistantPrompt,
      name: "HR Employee Assistant",
      model: "gpt-3.5-turbo",
    });

    res.json(assistant);
  } catch (error) {
    console.error("Error creating HR Employee assistant:", error);
    res.status(500).send("An error occurred while creating the HR Employee assistant.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
