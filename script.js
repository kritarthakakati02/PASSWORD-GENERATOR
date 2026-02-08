const slider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");
const passwordBox = document.getElementById("password");
const strengthValue = document.getElementById("strengthValue");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

slider.addEventListener("input", () => {
    lengthValue.textContent = slider.value;
});

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);

function secureRandom(max){
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % max;
}

function generatePassword(){

    const length = slider.value;

    const useAlphabets = document.getElementById("alphabets").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    let chars = "";

    if(useAlphabets){
        chars += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if(useNumbers){
        chars += "0123456789";
    }

    if(useSymbols){
        chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    }

    if(chars.length === 0){
        alert("Select at least one option!");
        return;
    }

    let password = "";

    for(let i=0;i<length;i++){
        password += chars[secureRandom(chars.length)];
    }

    passwordBox.textContent = password;
    updateStrength(password, useNumbers, useSymbols);
}

function updateStrength(password, numbers, symbols){

    let score = 0;

    if(password.length >= 8) score++;
    if(password.length >= 14) score++;
    if(numbers) score++;
    if(symbols) score++;

    if(score <= 1) strengthValue.textContent = "WEAK";
    else if(score == 2) strengthValue.textContent = "MEDIUM";
    else if(score == 3) strengthValue.textContent = "STRONG";
    else strengthValue.textContent = "VERY STRONG";
}

function copyPassword(){
    const text = passwordBox.textContent;
    if(text === "Click Generate") return;
    navigator.clipboard.writeText(text);
    alert("Password Copied");
}