// 1. SCROLL REVEAL ANIMATION
const reveals = document.querySelectorAll(".reveal");

function reveal() {
  const windowHeight = window.innerHeight;
  const elementVisible = 150;

  reveals.forEach((reveal) => {
    const elementTop = reveal.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add("active");
    }
  });
}
window.addEventListener("scroll", reveal);
reveal(); // Trigger once on load

// 2. SMOOTH SCROLL BUTTON
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ 
    behavior: "smooth" 
  });
}

// 3. MUSIC PLAYER (Spotify Embed Link)
const songs = {
  perfect: "https://open.spotify.com/embed/track/0tgVpDi06FyKpA1z0VMD4v",
  thousand: "https://open.spotify.com/embed/track/6lanRgr6wXibZr8KgzXxBl",
  allofme: "https://open.spotify.com/embed/track/3U4isOIWM3VvDubwSI3y7a"
};

function playSong(songKey) {
  const player = document.getElementById("player");
  // Menambahkan ?autoplay=1 agar langsung main (tergantung browser policy)
  player.src = songs[songKey] + "?autoplay=1";
}

// 4. GENERATE FLOATING HEARTS BACKGROUND
function createHearts() {
  const container = document.getElementById("bgHearts");
  const heartCount = 15; // Jumlah hati

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerHTML = "❤";
    
    // Posisi random
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s"; // 4-7 detik
    heart.style.fontSize = Math.random() * 20 + 10 + "px"; // Ukuran random
    
    container.appendChild(heart);
  }
}
// Jalankan saat load
createHearts();