const openTime = new Date("2026-05-16 00:00:00").getTime();

const countdown = document.getElementById("countdown");
const openBtn = document.getElementById("openBtn");
const message = document.getElementById("message");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = openTime - now;

  if (distance <= 0) {
    countdown.innerHTML = "Đã tới giờ rồi 🎉";
    message.innerHTML = "Bạn có thể mở quà sinh nhật rồi đó!";
    openBtn.disabled = false;
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdown.innerHTML = `
    ${days} ngày 
    ${hours} giờ 
    ${minutes} phút 
    ${seconds} giây
  `;
}

function goBirthday() {
  window.location.href = "./birthday.html";
}

updateCountdown();
setInterval(updateCountdown, 1000);