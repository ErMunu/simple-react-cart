import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import env from "react-dotenv";

const firebaseConfig = {
	apiKey: env.apiKey, 
	authDomain: env.authDomain, 
	projectId: env.projectId, 
	storageBucket: env.storageBucket, 
	messagingSenderId: env.messagingSenderId, 
	appId: env.appId
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
