const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const links = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window && sections.length) {
  let visible = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id));
    const active = sections.find(section => visible.has(section.id));
    links.forEach(link => {
      if (active && link.getAttribute('href') === `#${active.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-8% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}
