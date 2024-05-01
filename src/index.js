import React from 'react';
import './index.css';
import App from './App';
import Modal from 'react-modal';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client

// Get the root DOM element
const rootElement = document.getElementById('root');

// Set the app element for the modal
Modal.setAppElement(rootElement);

// Create a root using createRoot from react-dom/client
const root = createRoot(rootElement);

// Render the app inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
