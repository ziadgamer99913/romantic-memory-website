// 1. WELCOME SCREEN TEXT ANIMATION
const welcomeTexts = [
  { main: "Website Kenangan", sub: "Tempat menyimpan cerita kita." },
  { main: "Untuk Kenangan Indah", sub: "Semua momen spesial tersimpan di sini." },
  { main: "Untuk Kamu dan Dia", sub: "Terima kasih sudah menjadi bagian dari hidupku." }
];

let textIndex = 0;
const mainTextElement = document.getElementById("typingText");
const subTextElement = document.getElementById("subText");

function changeText() {
  // Fade out
  mainTextElement.style.opacity = 0;
  subTextElement.style.opacity = 0;

  setTimeout(() => {
    // Ganti Teks
    textIndex = (textIndex + 1) % welcomeTexts.length;
    mainTextElement.innerText = welcomeTexts[textIndex].main;
    subTextElement.innerText = welcomeTexts[textIndex].sub;

    // Fade in
    mainTextElement.style.opacity = 1;
    subTextElement.style.opacity = 1;
  }, 500); // Tunggu setengah detik (sesuai css transition)
}

// Jalankan ganti teks setiap 3 detik
let textInterval = setInterval(changeText, 3000);


// 2. MASUK KE WEBSITE
function enterWebsite() {
  clearInterval(textInterval); // Stop animasi teks

  const welcome = document.getElementById("welcomeScreen");
  const main = document.getElementById("mainContent");
  const music = document.getElementById("myAudio");

  welcome.style.opacity = "0";
  setTimeout(() => {
    welcome.style.display = "none";
    main.classList.add("show-content");

    // Play Music
    music.play().then(() => {
      updatePlayerUI(true, "Perfect - Ed Sheeran");
    }).catch(error => {
      console.log("Autoplay blocked:", error);
    });
  }, 800);
}

// 3. TIMER (SET TANGGAL JADIAN DI SINI)
const startDate = new Date("2023-02-14T00:00:00").getTime();

function updateTimer() {
  const now = new Date().getTime();
  const distance = now - startDate;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}
setInterval(updateTimer, 1000);

// 4. SCROLL ANIMATION
window.addEventListener("scroll", reveal);
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    }
  }
}

// 5. MUSIC PLAYER (Path folder: myAudio/)
const audio = document.getElementById("myAudio");
const playIcon = document.getElementById("mainPlayIcon");
const songTitle = document.getElementById("currentSongTitle");
const playerContainer = document.querySelector(".music-floater");

const songs = {
  perfect: { url: "myAudio/lagu-perfect.mp3", title: "Perfect - Ed Sheeran" },
  thousand: { url: "myAudio/lagu-thousand.mp3", title: "A Thousand Years" },
  allofme: { url: "myAudio/lagu-allofme.mp3", title: "All of Me - John Legend" }
};

function playSong(key) {
  const song = songs[key];

  // 1. Putar Audio
  audio.src = song.url;
  audio.play();

  // 2. Update Judul di Player Bawah
  updatePlayerUI(true, song.title);

  // 3. RESET TAMPILAN: Hapus class 'playing' dari semua lagu
  document.querySelectorAll('.track-item').forEach(item => {
    item.classList.remove('playing');
    // Kembalikan ikon jadi Play biasa
    const icon = item.querySelector('.track-icon i');
    icon.classList.remove('fa-music');
    icon.classList.add('fa-play');
  });

  // 4. SET TAMPILAN BARU: Tambah class 'playing' ke lagu yang dipilih
  const activeTrack = document.getElementById(`track-${key}`);
  if (activeTrack) {
    activeTrack.classList.add('playing');
    // Ubah ikon jadi not balok
    const icon = activeTrack.querySelector('.track-icon i');
    icon.classList.remove('fa-play');
    icon.classList.add('fa-music');
  }
}

function toggleMusic() {
  if (audio.paused) {
    audio.play();
    updatePlayerUI(true);
  } else {
    audio.pause();
    updatePlayerUI(false);
  }
}

function updatePlayerUI(isPlaying, title = null) {
  if (title) songTitle.innerText = title;

  if (isPlaying) {
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
    playerContainer.classList.add("music-playing");
  } else {
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    playerContainer.classList.remove("music-playing");
  }
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}