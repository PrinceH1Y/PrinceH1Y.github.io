const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();

  // Reveal sections on scroll.
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$(".reveal").forEach((el) => revealObserver.observe(el));

  // Cursor glow.
  const glow = $(".cursor-glow");
  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  });

  // Desktop 3D glass-card tilt.
  if (window.matchMedia("(pointer:fine)").matches) {
    $$("[data-tilt]").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          `perspective(900px) rotateX(${y * -7}deg) rotateY(${x * 7}deg) translateY(-3px)`;
      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });
    });
  }

  // Dark / light theme.
  const themeButton = $("#themeBtn");
  if (localStorage.getItem("prince-theme") === "light") {
    document.body.classList.add("light");
  }

  themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem(
      "prince-theme",
      document.body.classList.contains("light") ? "light" : "dark"
    );
  });

  // Print / Save as PDF.
  $("#printBtn").addEventListener("click", () => window.print());

  // Highlight navigation item based on visible section.
  const sections = $$("main section[id]");
  const navLinks = $$(".nav-links a");

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => navObserver.observe(section));
});
