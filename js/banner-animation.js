const bubbleColors = ["#bd60d1", "#ffb52e", "#8dcc00", "#ff4b50"];

export function initializeBannerAnimation(canvas) {
  const context = canvas.getContext("2d");
  const heading = canvas.parentElement.querySelector("h1");

  if (!context) {
    heading?.classList.remove("visually-hidden");
    canvas.hidden = true;
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sampleCanvas = document.createElement("canvas");
  const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true });
  const step = 9;
  let width = 0;
  let height = 0;
  let scale = 1;
  let particles = [];
  let pointer = null;
  let frame = 0;

  function buildParticles() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    if (!width || !height) return;

    scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);

    sampleCanvas.width = canvas.width;
    sampleCanvas.height = canvas.height;
    sampleContext.setTransform(scale, 0, 0, scale, 0, 0);
    sampleContext.clearRect(0, 0, width, height);

    const name = "Fiona Lin";
    const fontSize = Math.min(96, height * 0.72, (width - 24) / 4.25);
    sampleContext.font = `700 ${fontSize}px Arial, sans-serif`;
    sampleContext.textAlign = "center";
    sampleContext.textBaseline = "middle";
    sampleContext.fillStyle = "#fff";
    sampleContext.fillText(name, width / 2, height / 2);

    const pixels = sampleContext.getImageData(0, 0, sampleCanvas.width, sampleCanvas.height);
    const nextParticles = [];
    for (let y = step / 2; y < height; y += step) {
      for (let x = step / 2; x < width; x += step) {
        const pixelX = Math.floor(x * scale);
        const pixelY = Math.floor(y * scale);
        const alpha = pixels.data[(pixelY * sampleCanvas.width + pixelX) * 4 + 3];
        if (alpha < 150) continue;

        const colorIndex = Math.min(bubbleColors.length - 1, Math.floor((x / width) * bubbleColors.length));
        nextParticles.push({
          x,
          y,
          originX: x,
          originY: y,
          velocityX: 0,
          velocityY: 0,
          color: bubbleColors[colorIndex],
        });
      }
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
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance > 0 && distance < 105) {
          const force = (105 - distance) / 105;
          targetX += (dx / distance) * force * 30;
          targetY += (dy / distance) * force * 30;
        }
      }

      particle.velocityX = (particle.velocityX + (targetX - particle.x) * 0.09) * 0.78;
      particle.velocityY = (particle.velocityY + (targetY - particle.y) * 0.09) * 0.78;
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;

      context.beginPath();
      context.fillStyle = particle.color;
      context.arc(particle.x, particle.y, 4.2, 0, Math.PI * 2);
      context.fill();
    }
  }

  function animate() {
    draw();
    if (!reducedMotion && !document.hidden) {
      frame = window.requestAnimationFrame(animate);
    }
  }

  function updatePointer(event) {
    const bounds = canvas.getBoundingClientRect();
    pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    if (reducedMotion) return;
    if (!frame) frame = window.requestAnimationFrame(animate);
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

  const resizeObserver = new ResizeObserver(() => {
    buildParticles();
  });
  resizeObserver.observe(canvas);

  buildParticles();
  if (!reducedMotion) frame = window.requestAnimationFrame(animate);
}
