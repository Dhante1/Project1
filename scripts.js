let currentShift = 0;
let originalMessage = "";

const funnyHints = [
  (shift) => `The key is like the number of ${shift} 🍕 slices in a pizza!`,
  (shift) => `Think of ${shift} 🐘 elephants doing ballet...`,
  (shift) => `It's the same as ${shift} 🌟 stars in a tiny constellation`,
  (shift) => `Imagine counting ${shift} 🦄 unicorns jumping over the moon`,
  (shift) => `Picture ${shift} 🐸 frogs having a tea party`,
];
function getRandomHint(shift) {
  const randomIndex = Math.floor(Math.random() * funnyHints.length);
  return funnyHints[randomIndex](shift);
}

function encryptMessage() {
  const message = document.getElementById("messageInput").value;
  if (!message) {
    alert("Please enter a message to encrypt!");
    return;
  }

  originalMessage = message.toUpperCase();
  currentShift = Math.floor(Math.random() * 25) + 1; // Random shift between 1-25

  let encrypted = "";
  for (let char of originalMessage) {
    if (char.match(/[A-Z]/)) {
      let ascii = char.charCodeAt(0);
      let shifted = ascii + currentShift;
      if (shifted > 90) {
        // If past Z, wrap around to A
        shifted -= 26;
      }
      encrypted += String.fromCharCode(shifted);
    } else {
      encrypted += char;
    }
  }

  document.getElementById("encryptedDisplay").textContent = encrypted;
  document.getElementById("mainHint").textContent = getRandomHint(currentShift);
  document.getElementById("result").textContent = "";

  // Clear the text inside the input box without hiding it
  document.getElementById("messageInput").value = "";
}

function checkDecryption() {
  const attempt = document.getElementById("decryptAttempt").value.toUpperCase();
  const result = document.getElementById("result");

  if (attempt === originalMessage) {
    result.className = "success";
    result.textContent = "🎉 Congratulations! You solved it!";
  } else {
    result.className = "error";
    result.textContent = "❌ Not quite right. Try again!";
  }
}
