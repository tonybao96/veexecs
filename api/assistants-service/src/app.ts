import express from 'express';
import assistantRoutes from './routes/assistantRoutes';

const app = express();
app.use(express.json());

app.use('/assistants', assistantRoutes); // Prefix all assistants-related routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
