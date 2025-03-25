import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Login functionality
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const messageDiv = document.getElementById("loginMessage");

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        messageDiv.textContent = "Login successful! Redirecting...";
        messageDiv.style.color = "green";
        setTimeout(() => window.location.href = "listing-grid.html", 1500);
    } catch (error) {
        console.error("Login Error:", error);
        messageDiv.textContent = error.message;
        messageDiv.style.color = "red";
    }
});

// Password reset functionality
document.getElementById("reset").addEventListener("click", async function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const messageDiv = document.getElementById("loginMessage");

    if (!email) {
        messageDiv.textContent = "Please enter your email to reset the password.";
        messageDiv.style.color = "red";
        return;
    }

    try {
        await sendPasswordResetEmail(auth, email);
        messageDiv.textContent = "Password reset email sent! Check your inbox.";
        messageDiv.style.color = "green";
    } catch (error) {
        console.error("Reset Password Error:", error);
        messageDiv.textContent = error.message;
        messageDiv.style.color = "red";
    }
});
