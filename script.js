// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navLinks.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });

    // Handle dropdown on mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        dropbtn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdownContent = this.nextElementSibling;
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Here you can add your form submission logic
        // For now, we'll just show a success message
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.style.backgroundColor = '#4CAF50';

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Skill progress bars animation
const skillCards = document.querySelectorAll('.skill-card');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress-bar');
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
        }
    });
}, observerOptions);

skillCards.forEach(card => {
    observer.observe(card);
});

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Social links hover effect
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px)';
    });

    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// Add typing effect to hero section
const heroText = document.querySelector('.hero h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    // Start typing effect when the page loads
    window.addEventListener('load', typeWriter);
}