const yearNode = document.getElementById("current-year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const addStaggeredReveal = (selector, initialDelay = 80, step = 70) => {
  const nodes = document.querySelectorAll(selector);
  nodes.forEach((node, index) => {
    node.classList.add("reveal");
    node.style.setProperty("--reveal-delay", `${initialDelay + index * step}ms`);
  });
};

addStaggeredReveal(".feature-card", 100, 70);
addStaggeredReveal(".timeline-list li", 90, 100);
addStaggeredReveal(".stats article", 80, 110);
addStaggeredReveal(".faq-grid details", 80, 90);

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && reveals.length > 0) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  for (const node of reveals) {
    observer.observe(node);
  }
} else {
  for (const node of reveals) {
    node.classList.add("in-view");
  }
}

const heroPanel = document.querySelector(".hero-panel");
if (heroPanel) {
  window.addEventListener("scroll", () => {
    const y = Math.max(0, window.scrollY);
    const drift = Math.min(18, y * 0.03);
    heroPanel.style.transform = `translateY(${drift}px)`;
  });
}
