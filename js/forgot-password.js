import { auth } from "./firebase-config.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    const resetPasswordForm = document.getElementById("resetPasswordForm");
    const errorMessage = document.getElementById("error-message");
    const successMessage = document.getElementById("success-message");

    if (resetPasswordForm) {
        resetPasswordForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;

            // Clear previous messages
            errorMessage.style.display = "none";
            successMessage.style.display = "none";

            if (!email) {
                errorMessage.textContent = "Please enter a valid email address.";
                errorMessage.style.display = "block";
                return;
            }

            try {
                await sendPasswordResetEmail(auth, email);
                successMessage.style.display = "block";
                successMessage.textContent = "Password reset email sent! Please check your inbox.";

                resetPasswordForm.reset();

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 5000);
            } catch (error) {
                console.error("Password reset error:", error);
                errorMessage.style.display = "block";
                errorMessage.textContent = error.message;
            }
        });
    }
});
