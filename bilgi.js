const emojis = ["🎬", "📚", "🎥", "🍿", "⭐", "🎭", "📖", "🎤", "💡", "☀️"];
const emojiCount = 40;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");
  emoji.textContent = emojis[Math.floor(random(0, emojis.length))];
  emoji.style.left = random(0, window.innerWidth) + "px";
  emoji.style.fontSize = random(20, 40) + "px";
  emoji.style.animationDuration = random(6, 12) + "s";
  emoji.style.opacity = random(0.4, 0.9);
  document.body.appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, 12000); // 12 saniye sonra kaldır
}

function generateEmojis() {
  for (let i = 0; i < emojiCount; i++) {
    setTimeout(createEmoji, i * 300); // her 300ms bir emoji yarat
  }
}

generateEmojis();
setInterval(generateEmojis, 12000); // her 12 saniyede tekrar

// Ana sayfaya dönüş fonksiyonu
function goHome() {
  window.location.href = 'index.html'; // Ana sayfanın dosya adı index.html ise bu şekilde
}
