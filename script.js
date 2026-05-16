const scene = document.getElementById("scene");
const intro = document.getElementById("intro");
const passwordBox = document.getElementById("passwordBox");
const passwordInput = document.getElementById("passwordInput");
const openBtn = document.getElementById("openBtn");
const error = document.getElementById("error");
const letter = document.getElementById("letter");
const letterTitle = document.getElementById("letterTitle");
const letterText = document.getElementById("letterText");
const loadingFill = document.getElementById("loadingFill");
const loadingPercent = document.getElementById("loadingPercent");
const starsLayer = document.getElementById("stars");
const bgCanvas = document.getElementById("bgCanvas");
const ctx = bgCanvas.getContext("2d");

const correctPassword = "1705";
const titleContent = "Chúc mừng sinh nhật";

const letterContent = `
Chúc bạn sinh nhật thật vui vẻ,
luôn hạnh phúc và gặp thật nhiều điều may mắn trong cuộc sống.

Cảm ơn vì đã xuất hiện và mang đến rất nhiều điều dễ thương.

Mong rằng tuổi mới sẽ dịu dàng với bạn hơn,
và mọi điều bạn mong muốn đều sẽ trở thành hiện thực 💖
`;

const messages = [
  "Có một món quà nhỏ dành cho bạn...",
  "Một điều mình đã chuẩn bị khá lâu...",
  "Hy vọng khi mở ra bạn sẽ mỉm cười ✨",
  "Ready chưa nào?"
];

let sentenceIndex = 0;
let charIndex = 0;
let isOpening = false;
let letterOpened = false;

function showPasswordBox(){
  passwordBox.style.display = "block";

  setTimeout(() => {
    passwordBox.classList.add("show");
  }, 50);
}

function typeSentence(){
  if(!intro){
    showPasswordBox();
    return;
  }

  if(sentenceIndex >= messages.length){
    intro.style.opacity = "0";

    setTimeout(() => {
      intro.style.display = "none";
      showPasswordBox();
    }, 800);

    return;
  }

  const currentText = messages[sentenceIndex];

  if(charIndex < currentText.length){
    intro.innerHTML += currentText.charAt(charIndex);
    charIndex++;
    setTimeout(typeSentence, 50);
  }else{
    setTimeout(() => {
      intro.innerHTML = "";
      sentenceIndex++;
      charIndex = 0;
      typeSentence();
    }, 1500);
  }
}

function typeWriter(element, text, speed = 24, callback = null){
  element.innerHTML = "";
  let index = 0;

  function typing(){
    if(index < text.length){
      element.innerHTML += text.charAt(index);
      index++;

      letter.style.height = letter.scrollHeight + "px";
      setTimeout(typing, speed);
    }else if(callback){
      callback();
    }
  }

  typing();
}

function openLetter(){
  if(isOpening || letterOpened) return;

  const pass = passwordInput.value.trim();

  if(pass !== correctPassword){
    error.innerText = "Sai mật khẩu rồi 😝 thử lại nha";
    return;
  }

  isOpening = true;
  letterOpened = true;
  error.innerText = "";
  passwordBox.classList.add("hide");

  setTimeout(() => {
    passwordBox.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
      letter.classList.add("show");
    }, 50);

    document.fonts.ready.then(() => {
      typeWriter(letterTitle, titleContent, 55);

      setTimeout(() => {
        typeWriter(letterText, letterContent, 18, showCakeAndName);
      }, 1200);
    });
  }, 900);
}

function updatePasswordProgress(){
  const value = passwordInput.value.trim();
  let correctCount = 0;

  for(let i = 0; i < value.length; i++){
    if(value[i] === correctPassword[i]){
      correctCount++;
    }else{
      break;
    }
  }

  const percent = Math.floor((correctCount / correctPassword.length) * 100);
  loadingFill.style.width = percent + "%";
  loadingPercent.innerText = percent + "%";

  if(percent === 100){
    setTimeout(openLetter, 600);
  }
}

openBtn.addEventListener("click", openLetter);
passwordInput.addEventListener("input", updatePasswordProgress);
passwordInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter") openLetter();
});

function resizeCanvas(){
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];

for(let i = 0; i < 120; i++){
  particles.push({
    x:Math.random() * bgCanvas.width,
    y:Math.random() * bgCanvas.height,
    r:Math.random() * 3 + 1,
    dx:(Math.random() - .5) * .4,
    dy:(Math.random() - .5) * .4,
    alpha:Math.random() * .5 + .2
  });
}

function animateBackground(){
  ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

  particles.forEach((p) => {
    p.x += p.dx;
    p.y += p.dy;

    if(p.x < 0 || p.x > bgCanvas.width) p.dx *= -1;
    if(p.y < 0 || p.y > bgCanvas.height) p.dy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
    ctx.shadowBlur = 18;
    ctx.shadowColor = "#ffffff";
    ctx.fill();
  });

  requestAnimationFrame(animateBackground);
}

animateBackground();

function createMeteor(){
  const meteor = document.createElement("div");

  meteor.className = "shooting-star";
  meteor.style.left = Math.random() * window.innerWidth + 100 + "px";
  meteor.style.top = Math.random() * window.innerHeight * .35 + "px";
  meteor.style.width = Math.random() * 180 + 120 + "px";
  meteor.style.animationDuration = Math.random() * 1.2 + 1.6 + "s";

  scene.appendChild(meteor);

  setTimeout(() => {
    meteor.remove();
  }, 3000);
}

setInterval(() => {
  if(Math.random() > .72) createMeteor();
}, 900);

function createBackgroundStars(){
  const symbols = ["✦", "✧", "⋆", "✨"];

  for(let i = 0; i < 180; i++){
    const star = document.createElement("div");

    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    star.style.fontSize = Math.random() * 12 + 6 + "px";
    star.style.animationDuration = Math.random() * 4 + 2 + "s";
    star.style.animationDelay = Math.random() * 5 + "s";

    starsLayer.appendChild(star);
  }
}

createBackgroundStars();

function showCakeAndName(){
  setTimeout(() => {
    letter.classList.add("move-right");

    setTimeout(() => {
      showBigCake();

      document.fonts.ready.then(() => {
        makeNameFromStars();
      });
    }, 900);
  }, 2500);
}

function showBigCake(){
  if(document.querySelector(".big-cake")) return;

  const cake = document.createElement("img");

  cake.className = "big-cake";
  cake.src = "images/cake.gif";
  cake.alt = "birthday cake";

  scene.appendChild(cake);
}

function makeNameFromStars(){
  const textCanvas = document.createElement("canvas");
  const textCtx = textCanvas.getContext("2d");

  textCanvas.width = window.innerWidth;
  textCanvas.height = window.innerHeight;

  textCtx.font = "bold 88px 'Noto Sans SC', sans-serif";
  textCtx.textAlign = "center";
  textCtx.textBaseline = "middle";
  textCtx.fillStyle = "white";

  const nameX = window.innerWidth < 768
    ? window.innerWidth * .30
    : window.innerWidth * .25;

  textCtx.fillText("邓玉金银", nameX, window.innerHeight * .22);

  const imageData = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height).data;
  const points = [];

  for(let y = 0; y < textCanvas.height; y += 7){
    for(let x = 0; x < textCanvas.width; x += 7){
      const index = (y * textCanvas.width + x) * 4;

      if(imageData[index + 3] > 128){
        points.push({x, y});
      }
    }
  }

  let allStars = Array.from(document.querySelectorAll(".star"));

  while(allStars.length < points.length){
    const star = document.createElement("div");

    star.className = "star";
    star.innerHTML = Math.random() > .5 ? "✦" : "✧";
    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * window.innerHeight + "px";
    star.style.fontSize = Math.random() * 10 + 8 + "px";
    star.style.opacity = "0";

    allStars.push(star);
    scene.appendChild(star);
  }

  points.forEach((point, index) => {
    const star = allStars[index];

    star.classList.add("name-mode");
    star.innerHTML = "✦";
    star.style.left = point.x + "px";
    star.style.top = point.y + "px";
    star.style.fontSize = window.innerWidth < 768 ? "5px" : "6.5px";
    star.style.opacity = "1";
    star.style.transform = "scale(1.25)";
  });

  textCanvas.remove();
}

typeSentence();
