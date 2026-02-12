// Intersection Observer for Fade-up animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve if you want it to animate only once
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
});

// Hero Scroll Animation (Scrollytelling)
const heroSection = document.querySelector('.hero-section');
const heroTitle = document.getElementById('hero-title');
const heroImage = document.getElementById('hero-image');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight; // 1 viewport height

    // Calculate progress (0 to 1) based on scroll relative to window height
    // We want the effect to complete before the user scrolls past the sticky area too much
    let progress = scrollY / heroHeight;

    if (progress > 1) progress = 1;
    if (progress < 0) progress = 0;

    // Animate Title: Scale down and Fade out
    // Scale: 1 -> 0.8
    // Opacity: 1 -> 0 (at 50% progress)
    const scale = 1 - (progress * 0.5);
    const opacity = 1 - (progress * 2.5); // Fades out quicker

    if (heroTitle) {
        heroTitle.style.transform = `scale(${Math.max(scale, 0.5)})`;
        heroTitle.style.opacity = Math.max(opacity, 0);
    }

    // Animate Image: Scale up and Fade in
    // Starts appearing after title fades out
    // Opacity: 0 -> 1 (between 30% and 80% progress)
    let imgOpacity = 0;
    if (progress > 0.3) {
        imgOpacity = (progress - 0.3) * 2;
    }

    // Scale: 0.8 -> 1
    const imgScale = 0.8 + (progress * 0.2);

    if (heroImage) {
        heroImage.style.opacity = Math.min(imgOpacity, 1);
        heroImage.style.transform = `scale(${Math.min(imgScale, 1)})`;
    }
});
