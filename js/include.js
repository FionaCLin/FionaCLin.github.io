const pageIncludes = ["nav", "header", "footer"];

async function includePartial(name) {
  const target = document.querySelector(`[data-include="${name}"]`);
  if (!target) return;

  try {
    const response = await fetch(`partials/${name}.html`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    target.innerHTML = await response.text();
  } catch (error) {
    console.error(`Unable to load the ${name} partial.`, error);
  }
}

function setActiveNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-display a").forEach((link) => {
    if (link.pathname.split("/").pop() === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all(pageIncludes.map(includePartial));
  setActiveNavigation();
});

document.addEventListener("click", (event) => {
  const button = event.target.closest(".nav-open-btn");
  if (!button) return;

  const navigation = document.querySelector(".nav-display");
  if (!navigation) return;

  const isExpanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!isExpanded));
  navigation.classList.toggle("open", !isExpanded);
});
