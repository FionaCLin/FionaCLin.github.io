async function includePartial(name, selector) {
  try {
    const res = await fetch(`partials/${name}.html`);
    if (!res.ok) return;
    const text = await res.text();
    document.querySelectorAll(selector).forEach(el => el.innerHTML = text);
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
