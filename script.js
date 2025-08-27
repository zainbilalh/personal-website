const navbar = document.getElementById("navbar");
let lastScrollY = window.scrollY;
let lastTimestamp = performance.now();
let ticking = false;

// Maximum slide distance (navbar height)
const NAVBAR_HEIGHT = navbar.offsetHeight;

function handleNavbarScroll() {
  const currentScrollY = window.scrollY;
  const now = performance.now();
  const deltaY = currentScrollY - lastScrollY;
  const deltaTime = now - lastTimestamp;

  // Calculate scroll speed (pixels per ms)
  const speed = Math.abs(deltaY) / (deltaTime || 1);

  // Map scroll speed to transition duration (faster scroll = shorter duration)
  // Clamp between 0.2s and 1s
  const duration = Math.max(0.2, Math.min(1, 0.8 / (speed + 0.01))) - 0.5;
  navbar.style.transition = `transform ${duration}s cubic-bezier(0.4,0,0.2,1)`;

  // Map scroll distance to slide amount (up to -100%)
  let slideAmount = 0;
  if (currentScrollY > 50 && deltaY > 0) {
    // Scrolling down: slide up proportional to scroll distance, max -100%
    slideAmount = Math.max(
      -100,
      -Math.min(100, ((currentScrollY - 50) / NAVBAR_HEIGHT) * 100)
    );
    navbar.style.transform = `translateY(${slideAmount}%)`;
  } else {
    // Scrolling up or near top: slide back in
    navbar.style.transform = "translateY(0)";
  }

  lastScrollY = currentScrollY;
  lastTimestamp = now;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(handleNavbarScroll);
    ticking = true;
  }
});
