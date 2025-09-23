document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");

  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
      const target = link.getAttribute("href");

      if (!target || target.startsWith("http") || target.startsWith("#")) return;

      e.preventDefault();

      // Activate overlay (fades IN)
      overlay.classList.add("active");

      // After fade is done, redirect
      setTimeout(() => {
        window.location.href = target;
      }, 800); // matches CSS transition
    });
  });
});

// Floating hearts animation
const canvas = document.getElementById("hearts");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let hearts = [];
  let w, h;

  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Heart {
    constructor() {
      this.x = Math.random() * w;
      this.y = h + 20; // start below screen
      this.size = Math.random() * 20 + 10;
      this.speed = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.5;
      this.dx = Math.random() * 1 - 0.5; // little horizontal drift
    }

    draw() {
      ctx.fillStyle = `rgba(255, 51, 153, ${this.opacity})`; // bright pink hearts
      ctx.beginPath();
      let topCurveHeight = this.size * 0.3;
      ctx.moveTo(this.x, this.y);
      ctx.bezierCurveTo(this.x - this.size / 2, this.y - topCurveHeight,
                        this.x - this.size, this.y + this.size / 2,
                        this.x, this.y + this.size);
      ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 2,
                        this.x + this.size / 2, this.y - topCurveHeight,
                        this.x, this.y);
      ctx.closePath();
      ctx.fill();
    }

    update() {
      this.y -= this.speed;
      this.x += this.dx;
      if (this.y < -10) {
        this.y = h + 20;
        this.x = Math.random() * w;
      }
      this.draw();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    if (hearts.length < 50) { // max number of hearts
      hearts.push(new Heart());
    }
    hearts.forEach(heart => heart.update());
    requestAnimationFrame(animate);
  }

  animate();
}

// Typing effect for love letter
document.addEventListener("DOMContentLoaded", () => {
  const letter = document.getElementById("love-letter");
  if (letter) {
    const text = letter.textContent.trim();
    letter.textContent = ""; // clear initially

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        letter.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 75); // typing speed (ms)
      }
    }
    typeWriter();
  }
});
