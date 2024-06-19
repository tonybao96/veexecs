import express from 'express';
import morgan from 'morgan';
import assistantRoutes from './routes/assistantRoutes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.use('', assistantRoutes); // Prefix all assistants-related routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
