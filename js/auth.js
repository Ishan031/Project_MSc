  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
// Firebase Configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC6-zAsP7QAMyZx3OKJdx5aF5f5edqJzp4",
    authDomain: "luxurydrive-7ba79.firebaseapp.com",
    projectId: "luxurydrive-7ba79",
    storageBucket: "luxurydrive-7ba79.firebasestorage.app",
    messagingSenderId: "777374237079",
    appId: "1:777374237079:web:0182ea4c72cb47258d84d2",
    measurementId: "G-JJPT639MC0"
  };
  
  // Initialize Firebase
    const analytics = getAnalytics(app);
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
  
  
  // Login Functionality
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const email = document.getElementById('loginEmail').value;
          const password = document.getElementById('loginPassword').value;
  
          auth.signInWithEmailAndPassword(email, password)
              .then((userCredential) => {
                  // Redirect to dashboard or home page
                  window.location.href = 'index.html';
              })
              .catch((error) => {
                  document.getElementById('loginMessage').textContent = error.message;
              });
      });
  }
  


// Debugging: Check Firebase Initialization
console.log("Firebase Initialized:", app);

// Registration Functionality
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent form submission

        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const messageDiv = document.getElementById('registerMessage');

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            console.log("User created:", userCredential.user);
            messageDiv.textContent = "Registration successful! Redirecting...";
            messageDiv.className = "message success";
            setTimeout(() => window.location.href = 'index.html', 1500); // Redirect after 1.5 seconds
        } catch (error) {
            console.error("Error:", error);
            messageDiv.textContent = error.message;
            messageDiv.className = "message error";
        }
    });
}
  
//   // Auth State Listener (Optional)
//   auth.onAuthStateChanged((user) => {
//       if (user) {
//           console.log('User is logged in:', user.email);
//       } else {
//           console.log('User is logged out');
//       }
//   });