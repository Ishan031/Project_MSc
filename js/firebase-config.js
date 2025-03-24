// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6-zAsP7QAMyZx3OKJdx5aF5f5edqJzp4",
    authDomain: "luxurydrive-7ba79.firebaseapp.com",
    projectId: "luxurydrive-7ba79",
    storageBucket: "luxurydrive-7ba79.appspot.com", // Fixed incorrect domain
    messagingSenderId: "777374237079",
    appId: "1:777374237079:web:0182ea4c72cb47258d84d2",
    measurementId: "G-JJPT639MC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export auth for use in other files
export { auth };
