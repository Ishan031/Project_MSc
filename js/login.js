import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form refresh

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const messageDiv = document.getElementById("loginMessage");

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        messageDiv.textContent = "Login successful! Redirecting...";
        messageDiv.style.color = "green";
        setTimeout(() => window.location.href = "index.html", 1500); // Redirect to home
    } catch (error) {
        console.error("Login Error:", error);
        messageDiv.textContent = error.message;
        messageDiv.style.color = "red";
    }
});
