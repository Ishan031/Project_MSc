import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const messageDiv = document.getElementById("registerMessage");

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User created:", userCredential.user);
        messageDiv.textContent = "Registration successful! Redirecting...";
        messageDiv.style.color = "green";
        setTimeout(() => window.location.href = "dashboard.html", 1500);
    } catch (error) {
        console.error("Error:", error);
        messageDiv.textContent = error.message;
        messageDiv.style.color = "red";
    }
});
