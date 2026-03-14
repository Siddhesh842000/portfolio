// Initialize AOS Animations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic',
    });

    // Set Copyright Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Typing Effect Logic
    const typedTextSpan = document.querySelector(".typed-roles");
    const cursorSpan = document.createElement('span');
    cursorSpan.classList.add('typing-cursor');
    cursorSpan.textContent = '|';
    cursorSpan.style.animation = 'blink 1s infinite step-end';
    
    // Add simple CSS for cursor blinking
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes blink {
            50% { opacity: 0; }
        }
        .typing-cursor {
            color: var(--primary);
            margin-left: 2px;
            font-weight: 400;
        }
    `;
    document.head.appendChild(style);
    
    document.querySelector('.typing-text').appendChild(cursorSpan);

    const rolesList = [
        "Data Scientist",
        "Machine Learning Engineer",
        "Python Developer",
        "Tech Enthusiast"
    ];

    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let roleIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < rolesList[roleIndex].length) {
            typedTextSpan.textContent += rolesList[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = rolesList[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            roleIndex++;
            if (roleIndex >= rolesList.length) roleIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }

    // Start styling effect
    if(typedTextSpan) {
        setTimeout(type, 1000);
    }
});

// Custom Cursor (Only active on desktop)
const isDesktop = window.matchMedia("(min-width: 768px)").matches;

if (isDesktop) {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Add slight delay to outline for smooth tracing effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect on clickable elements
    const clickables = document.querySelectorAll('a, button, .hover-effect, .hamburger');
    
    clickables.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if(navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        }
    });
});

// Active Link highlighting on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for navbar

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});
