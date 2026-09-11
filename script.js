document.addEventListener("DOMContentLoaded", () => {
  const themes = ["theme-cyan","theme-violet","theme-emerald","theme-coral","theme-indigo","theme-teal"];
  const last = localStorage.getItem("prince-last-theme");
  let choices = themes.filter(t => t !== last);
  const selected = choices[Math.floor(Math.random() * choices.length)];
  document.body.classList.add(selected);
  localStorage.setItem("prince-last-theme", selected);

  document.getElementById("year").textContent = new Date().getFullYear();

  document.getElementById("themeBtn").addEventListener("click", () => {
    const current = themes.find(t => document.body.classList.contains(t));
    let next = themes.filter(t => t !== current)[Math.floor(Math.random() * (themes.length - 1))];
    document.body.classList.remove(...themes);
    document.body.classList.add(next);
    localStorage.setItem("prince-last-theme", next);
  });

  document.getElementById("downloadBtn").addEventListener("click", () => {
    window.print();
  });

  const animated = document.querySelectorAll(".glass-card,.hero,.contact");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("seen");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.08});
  animated.forEach(el => observer.observe(el));
});