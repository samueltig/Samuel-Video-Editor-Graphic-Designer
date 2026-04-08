// Initialize Lucide Icons
lucide.createIcons();

// Custom Cursor
const cursorOutline = document.getElementById('cursor-outline');
const cursorDot = document.getElementById('cursor-dot');

window.addEventListener('mousemove', (e) => {
    gsap.to(cursorOutline, {
        x: e.clientX - 16,
        y: e.clientY - 16,
        duration: 0.5,
        ease: 'power3.out'
    });
    gsap.to(cursorDot, {
        x: e.clientX - 2,
        y: e.clientY - 2,
        duration: 0.1
    });
});

// Loader
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    tl.to('#loader-bar', {
        x: '0%',
        duration: 1,
        ease: 'power2.inOut'
    })
    .to('#loader', {
        y: '-100%',
        duration: 0.8,
        ease: 'power4.inOut',
        delay: 0.2
    })
    .from('.hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.4');
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('glass', 'py-4');
        navbar.classList.remove('py-6');
    } else {
        navbar.classList.remove('glass', 'py-4');
        navbar.classList.add('py-6');
    }
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
let isMenuOpen = false;

menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        gsap.from(mobileMenu, { opacity: 0, y: -20, duration: 0.3 });
    } else {
        mobileMenu.classList.add('hidden');
    }
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        isMenuOpen = false;
    });
});

// GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

// Reveal animations
const reveals = [
    { selector: '.reveal-left', x: -50 },
    { selector: '.reveal-right', x: 50 },
    { selector: '.portfolio-card', y: 30, stagger: 0.1 },
    { selector: '.service-card', y: 30, stagger: 0.1 }
];

reveals.forEach(reveal => {
    gsap.from(reveal.selector, {
        scrollTrigger: {
            trigger: reveal.selector,
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        x: reveal.x || 0,
        y: reveal.y || 0,
        opacity: 0,
        duration: 1,
        stagger: reveal.stagger || 0,
        ease: 'power3.out'
    });
});

// Skill bars animation
gsap.utils.toArray('.skill-item').forEach(item => {
    const bar = item.querySelector('.skill-bar');
    const level = item.getAttribute('data-level');
    
    gsap.to(bar, {
        scrollTrigger: {
            trigger: item,
            start: 'top 90%'
        },
        width: `${level}%`,
        duration: 1.5,
        ease: 'power2.out'
    });
});

// Portfolio Tabs
const tabVideo = document.getElementById('tab-video');
const tabGraphic = document.getElementById('tab-graphic');
const videoGrid = document.getElementById('video-grid');
const graphicGrid = document.getElementById('graphic-grid');

function switchTab(activeTab, inactiveTab, showGrid, hideGrid) {
    activeTab.classList.add('bg-white', 'text-black');
    activeTab.classList.remove('text-zinc-400');
    inactiveTab.classList.remove('bg-white', 'text-black');
    inactiveTab.classList.add('text-zinc-400');
    
    hideGrid.classList.add('hidden');
    showGrid.classList.remove('hidden');
    
    gsap.from(showGrid.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1
    });
}

tabVideo.addEventListener('click', () => switchTab(tabVideo, tabGraphic, videoGrid, graphicGrid));
tabGraphic.addEventListener('click', () => switchTab(tabGraphic, tabVideo, graphicGrid, videoGrid));
