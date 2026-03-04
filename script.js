const passwordInput = document.getElementById("password");
const strengthBar = document.getElementById("strength");
const message = document.getElementById("message");

const lengthRule = document.getElementById("length");
const uppercaseRule = document.getElementById("uppercase");
const numberRule = document.getElementById("number");
const specialRule = document.getElementById("special");

passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    let strength = 0;

    // Reset if empty
    if (password.length === 0) {
        strengthBar.style.width = "0%";
        message.textContent = "";
        resetRules();
        return;
    }

    // Length check
    if (password.length >= 8) {
        setValid(lengthRule, "✔ Minimum 8 characters");
        strength++;
    } else {
        setInvalid(lengthRule, "❌ Minimum 8 characters");
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
        setValid(uppercaseRule, "✔ Contains uppercase letter");
        strength++;
    } else {
        setInvalid(uppercaseRule, "❌ Add an uppercase letter");
    }

    // Number check
    if (/[0-9]/.test(password)) {
        setValid(numberRule, "✔ Contains number");
        strength++;
    } else {
        setInvalid(numberRule, "❌ Add a number");
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
        setValid(specialRule, "✔ Contains special character");
        strength++;
    } else {
        setInvalid(specialRule, "❌ Add a special character");
    }

    // Calculate percentage
    const percentage = (strength / 4) * 100;
    strengthBar.style.width = percentage + "%";

    updateStrengthUI(strength, password);
});


// ✅ Helper Functions

function setValid(element, text) {
    element.classList.add("valid");
    element.textContent = text;
}

function setInvalid(element, text) {
    element.classList.remove("valid");
    element.textContent = text;
}

function resetRules() {
    const rules = [lengthRule, uppercaseRule, numberRule, specialRule];
    rules.forEach(rule => rule.classList.remove("valid"));
}


// 🔥 Strength UI + Pattern Detection

function updateStrengthUI(strength, password) {

    const weakPatterns = ["123", "password", "admin", "qwerty", "abc", "000"];

    for (let pattern of weakPatterns) {
        if (password.toLowerCase().includes(pattern)) {
            strengthBar.style.background = "#ff4d4d";
            message.textContent = "⚠ Avoid common patterns like '123' or 'password'";
            return;
        }
    }

    if (strength === 1) {
        strengthBar.style.background = "#ff4d4d"; // Red
        message.textContent = "Weak password ❌";
    } 
    else if (strength === 2) {
        strengthBar.style.background = "#ffa502"; // Orange
        message.textContent = "Medium password ⚠";
    } 
    else if (strength === 3) {
        strengthBar.style.background = "#fbc531"; // Yellow
        message.textContent = "Strong password 👍";
    } 
    else if (strength === 4) {
        strengthBar.style.background = "#2ed573"; // Green
        message.textContent = "Very Strong password 🔐";
    }
}