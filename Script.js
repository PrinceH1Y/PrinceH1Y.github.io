document.addEventListener("DOMContentLoaded", () => {
  // Keep the resume links functional while making the page print-friendly.
  const links = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]');
  links.forEach(link => link.setAttribute("aria-label", link.textContent.trim()));
});
