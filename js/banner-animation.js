import "../stylesheets/js/alphabet.js";

const bubbleColors = [
  "hsl(280, 50%, 60%)",
  "hsl(40, 100%, 60%)",
  "hsl(75, 100%, 40%)",
  "hsl(0, 100%, 63%)",
];

const referenceWidth = 750;
const referenceHeight = 150;

export function initializeBannerAnimation(canvas) {
  const context = canvas.getContext("2d");
  const heading = canvas.parentElement.querySelector("h1");

  if (!context || !document.alphabet) {
    heading?.classList.remove("visually-hidden");
    canvas.hidden = true;
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let scaleX = 1;
  let scaleY = 1;
  let particles = [];
  let pointer = null;
  let frame = 0;

  function buildParticles() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    if (!width || !height) return;

    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    scaleX = width / referenceWidth;
    scaleY = height / referenceHeight;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const letters = Array.from("Fiona Lin", (character) => {
      const code = character.charCodeAt(0).toString(16);
      return document.alphabet[`A${code}`];
    });
    const nextParticles = [];
    const horizontalInset = window.matchMedia("(max-width: 680px)").matches ? 5 : 18;
    let offset = 0;
    let colorIndex = -1;

    for (let index = 0; index < letters.length; index += 1) {
      const letter = letters[index];
      const character = "Fiona Lin"[index];
      if (character !== " ") colorIndex += 1;

      if (letter) {
        for (const [x, y, radius] of letter.P) {
          nextParticles.push({
            x: 0,
            y: 0,
            originX: horizontalInset + (offset + x) * scaleX,
            originY: (referenceHeight / 2 - 105 + y) * scaleY,
            velocityX: 0,
            velocityY: 0,
            velocityZ: 0,
            depth: 1,
            radius: radius * scaleX,
            color: bubbleColors[colorIndex % bubbleColors.length],
          });
        }
        offset += letter.W;
      }
    }

    for (const particle of nextParticles) {
      particle.x = particle.originX;
      particle.y = particle.originY;
    }

    particles = nextParticles;
    draw();
  }

  function draw() {
    context.clearRect(0, 0, width, height);

    for (const particle of particles) {
      let targetX = particle.originX;
      let targetY = particle.originY;

      if (pointer) {
        const dx = pointer.x - particle.x;
        const dy = pointer.y - particle.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 150) {
          targetX = particle.x - dx;
          targetY = particle.y - dy;
        }
      }

      particle.velocityX = (particle.velocityX + (targetX - particle.x) * 0.1) * 0.85;
      particle.velocityY = (particle.velocityY + (targetY - particle.y) * 0.1) * 0.85;
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;

      const displacement = Math.hypot(particle.originX - particle.x, particle.originY - particle.y);
      const targetDepth = displacement / 100 + 1;
      particle.velocityZ = (particle.velocityZ + (targetDepth - particle.depth) * 0.1) * 0.85;
      particle.depth += particle.velocityZ;

      context.beginPath();
      context.fillStyle = particle.color;
      context.arc(particle.x, particle.y, Math.max(1, particle.radius * particle.depth), 0, Math.PI * 2);
      context.fill();
    }
  }

  function animate() {
    draw();
    if (!reducedMotion && !document.hidden) {
      frame = window.requestAnimationFrame(animate);
    } else {
      frame = 0;
    }
  }

  function updatePointer(event) {
    const bounds = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    if (!reducedMotion && !frame) frame = window.requestAnimationFrame(animate);
  }

  canvas.addEventListener("pointermove", updatePointer);
  canvas.addEventListener("pointerleave", () => {
    pointer = null;
    if (!reducedMotion && !frame) frame = window.requestAnimationFrame(animate);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && frame) {
      window.cancelAnimationFrame(frame);
      frame = 0;
    } else if (!document.hidden && !reducedMotion && !frame) {
      frame = window.requestAnimationFrame(animate);
    }
  });

  const resizeObserver = new ResizeObserver(buildParticles);
  resizeObserver.observe(canvas);
  buildParticles();
  if (!reducedMotion) frame = window.requestAnimationFrame(animate);
}
