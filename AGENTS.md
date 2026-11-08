# Development Guidelines

## General
- Follow clean code principles.
- Prefer simple, maintainable solutions.
- Follow existing project conventions.
- Avoid unnecessary dependencies.
- Do not introduce breaking changes without approval.

## Before Coding
- Inspect the existing project structure.
- Understand the existing implementation.
- Explain the proposed approach for complex changes.

## Java
- Follow standard Java conventions.
- Use meaningful variable and method names.
- Write unit tests for new functionality.
- Handle exceptions properly.

## AWS
- Follow AWS Well-Architected principles.
- Consider scalability, reliability and security.
- Handle retries, timeouts and DLQs appropriately.
- Avoid hardcoding credentials or secrets.

## Node.js / TypeScript
- Prefer TypeScript where appropriate.
- Use async/await.
- Handle errors explicitly.

## Testing
- Run relevant unit tests after changes.
- Do not claim tests passed unless they actually ran.
- Explain any failing tests.

## Responsive UI Verification
- For responsive layout changes, serve the site over HTTP from the repository root (for example, `python3 -m http.server 8000`).
- Use headless Chrome with CSS viewport emulation through the Chrome DevTools Protocol; do not rely on `--window-size` alone to set the page viewport.
- Inspect screenshots at 390×844 (phone), 768×1024 (tablet), and 1440×1000 (desktop) for the affected pages, including standalone interactive pages.
- At each viewport, check that `document.documentElement.scrollWidth` does not exceed `window.innerWidth`. Check mobile navigation open and closed states where applicable.
- Wait for shared partials, page data, and CSS transitions to settle before capturing screenshots.
- Report the viewport sizes checked and any issues found. If headless browser access is unavailable, say so and do not claim visual verification.

## Git
- Never force push.
- Never delete branches or overwrite user changes without approval.
- Do not commit changes unless requested.
