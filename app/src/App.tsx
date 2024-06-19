import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
interface Content {
    type: string;
    text: {
        value: string;
        annotations: any[];
    };
}

interface AssistantMessage {
  id: string;
  object: string;
  created_at: number;
  assistant_id: string | null;
  thread_id: string;
  run_id: string | null;
  role: string;
  content: Content[];
  file_ids: any[];
  metadata: any;
  text: string;
  createdAt: string;
}

  const [assistantId, setAssistantId] = useState<string>('');
  const [threadId, setThreadId] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [threadStatus, setThreadStatus] = useState<string>('');

  const createAssistant = async () => {
    try {
      const response = await axios.post('/assistants', {
        assistantType: 'HR'  // Adjust this to your use case
      });
      const { id, metadata } = response.data.assistant;
      setAssistantId(id);
      setThreadId(metadata.threadId);
    } catch (error: any) {
      console.error('Error creating assistant:', error);
      setThreadStatus('Failed to create assistant');
    }
  };

  const addMessage = async () => {
    if (!threadId || !userInput) return;
    try {
      await axios.post(`/threads/${threadId}/messages`, { content: userInput });
      runThread();
    } catch (error: any) {
      console.error('Error adding message:', error);
    }
  };

  const runThread = async () => {
    try {
      const url = `/threads/${threadId}/assistants/${assistantId}/run`;
      await axios.post(url);
      setThreadStatus('Running');
      listMessages();
    } catch (error: any) {
      console.error('Error running thread:', error);
      setThreadStatus('Failed to run thread');
    }
  };



function isAssistantMessage(data: any): data is AssistantMessage {
  return typeof data === 'object' && typeof data.id === 'string' && typeof data.role === 'string';
}

const listMessages = async () => {
  try {
      const response = await axios.get(`/threads/${threadId}/messages`);
      if (response.data.every(isAssistantMessage)) {
          const formattedMessages = response.data.map((msg: AssistantMessage) => ({
              id: msg.id,
              role: msg.role,
              text: msg.content[0] && msg.content[0].text ? msg.content[0].text.value : "No message content",
              createdAt: new Date(msg.created_at * 1000).toLocaleString()
          }));
          setMessages(formattedMessages);
      } else {
          throw new Error("Invalid message format received from API");
      }
  } catch (error) {
      console.error('Error listing messages:', error);
  }
};

return (
  <div className="App">
      <header className="App-header">
          <h1>Assistant Manager</h1>
          <button onClick={createAssistant}>Create Assistant</button>
          <p>Assistant ID: {assistantId}</p>
          <input 
              value={userInput} 
              onChange={(e) => setUserInput(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' ? addMessage() : null} 
          />
          <button onClick={addMessage}>Send Message</button>
          <div>
              <p>Thread Status: {threadStatus}</p>
              <h2>Messages:</h2>
              {messages.map((msg) => (
                  <div key={msg.id}>
                      <p><strong>{msg.role} ({msg.createdAt}):</strong> {msg.text}</p>
                  </div>
              ))}
          </div>
      </header>
  </div>
);

}

export default App;