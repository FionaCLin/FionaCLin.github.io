async function includePartial(name, selector) {
  try {
    const res = await fetch(`partials/${name}.html`);
    if (!res.ok) return;
    const text = await res.text();

    document.querySelectorAll(selector).forEach(el => {
      // Parse the HTML into a container so we can extract scripts
      const container = document.createElement('div');
      container.innerHTML = text;

      // Move non-script children into target element
      Array.from(container.childNodes).forEach(node => {
        if (node.tagName && node.tagName.toLowerCase() === 'script') return;
        el.appendChild(node.cloneNode(true));
      });

      // Execute script tags by creating new script elements
      Array.from(container.querySelectorAll('script')).forEach(s => {
        const script = document.createElement('script');
        if (s.src) {
          script.src = s.src;
        } else {
          script.textContent = s.textContent;
        }
        document.body.appendChild(script);
      });
    });
  } catch (e) {
    console.error('Include error', e);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await includePartial('nav', '[data-include="nav"]');
  await includePartial('header', '[data-include="header"]');
  await includePartial('footer', '[data-include="footer"]');

  // Attach nav toggle after injection
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.nav-open-btn');
    if (btn) {
      const display = document.querySelector('.nav-display');
      if (display) display.classList.toggle('open');
    }
  });
});
