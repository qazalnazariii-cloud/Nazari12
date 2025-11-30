const message = document.getElementById("message");
const history = document.getElementById("history");
const remaining = document.getElementById("remaining");
const input = document.getElementById("guessInput");
const btn = document.getElementById("guessBtn");
const newGameBtn = document.getElementById("newGame");

let possible = new Set([...Array(101).keys()].slice(1)); // 1 تا 100
let attempts = 0;

function updateRemaining() {
  remaining.textContent = `اعداد ممکن باقی‌مونده: ${possible.size}`;
}

function newGame() {
  possible = new Set([...Array(101).keys()].slice(1));
  attempts = 0;
  history.innerHTML = "";
  message.textContent = "بازی جدید شروع شد!";
  updateRemaining();
  input.value = "";
  btn.style.display = "inline";
  newGameBtn.style.display = "none";
}

btn.onclick = () => {
  const guess = parseInt(input.value);
  
  if (!guess || guess < 1 || guess > 100) {
    message.textContent = "لطفاً یه عدد بین ۱ تا ۱۰۰ وارد کن!";
    return;
  }

  attempts++;
  
  if (possible.has(guess)) {
    // برد!
    message.innerHTML = `آفرین! درست حدس زدی: <span style="color:#ff0">${guess}</span> 🎉<br>در ${attempts} تلاش!`;
    history.innerHTML += `<span style="color:#2ed573">حدس ${attempts}: ${guess} → درست!</span><br>`;
    btn.style.display = "none";
    newGameBtn.style.display = "inline";
    possible.clear();
  } else {
    // غلط — دشمن اعداد ممکن رو کم می‌کنه
    possible.delete(guess);
    history.innerHTML += `<span style="color:#ff4757">حدس ${attempts}: ${guess} → غلط</span><br>`;
    message.textContent = "غلط بود! دوباره امتحان کن 😈";
    updateRemaining();
    
    if (possible.size === 0) {
      message.innerHTML = "من بردم! دیگه هیچ عددی نمونده بود 😈😈";
      btn.style.display = "none";
      newGameBtn.style.display = "inline";
    }
  }
  
  input.value = "";
  input.focus();
};

newGameBtn.onclick = newGame;

// شروع بازی
newGame();
