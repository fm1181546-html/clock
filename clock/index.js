const body = document.body;
const hourHand = document.querySelector(".hour");
const minuteHand = document.querySelector(".minute");
const secondHand = document.querySelector(".second");
const modeSwitch = document.querySelector(".mode-switch");

const digitalTimeEl = document.querySelector("#digital-time");
const digitalDateEl = document.querySelector("#digital-date");
const themeButtons = document.querySelectorAll(".theme-btn");

// Photo widget gallery
const photoWidget = document.querySelector("#widget-photo");
const prevPhotoBtn = document.querySelector("#prev-photo");
const nextPhotoBtn = document.querySelector("#next-photo");

const photos = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
];

let currentPhotoIndex = 0;

const updatePhoto = (index) => {
  currentPhotoIndex = (index + photos.length) % photos.length;
  photoWidget.src = photos[currentPhotoIndex];
};

prevPhotoBtn.addEventListener("click", () => {
  updatePhoto(currentPhotoIndex - 1);
});

nextPhotoBtn.addEventListener("click", () => {
  updatePhoto(currentPhotoIndex + 1);
});

const setTheme = (theme) => {
  body.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  themeButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.theme === theme);
  });
};

setTheme(localStorage.getItem("theme") || "ocean");

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => setTheme(btn.dataset.theme));
});

if (localStorage.getItem("mode") === "Dark Mode") {
  body.classList.add("dark");
  modeSwitch.textContent = "Light Mode";
}

const toggleDarkMode = () => {
  const isDarkMode = body.classList.toggle("dark");
  modeSwitch.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  localStorage.setItem("mode", isDarkMode ? "Dark Mode" : "Light Mode");
};

modeSwitch.addEventListener("click", toggleDarkMode);

modeSwitch.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleDarkMode();
  }
});

const updateTime = () => {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours() % 12;

  const secToDeg = (seconds / 60) * 360;
  const minToDeg = ((minutes + seconds / 60) / 60) * 360;
  const hrToDeg = ((hours + minutes / 60) / 12) * 360;

  secondHand.style.transform = `rotate(${secToDeg}deg)`;
  minuteHand.style.transform = `rotate(${minToDeg}deg)`;
  hourHand.style.transform = `rotate(${hrToDeg}deg)`;

  if (digitalTimeEl) {
    digitalTimeEl.textContent = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  }

  if (digitalDateEl) {
    digitalDateEl.textContent = new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date);
  }
};

setInterval(updateTime, 1000);
updateTime();