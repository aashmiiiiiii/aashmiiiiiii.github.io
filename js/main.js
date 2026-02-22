/**
 * Data Analyst Portfolio - Main JavaScript
 * Handles all interactivity, animations, and dynamic effects
 */

// ===================================
// DOM Elements
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const typedText = document.getElementById('typed-text');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const backToTop = document.getElementById('back-to-top');

// ===================================
// Typed Text Effect
// ===================================
const typedStrings = [
    'Data Analyst',
    'Python Developer',
    'SQL Expert',
    'Visualization Specialist'
];

let stringIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentString = typedStrings[stringIndex];

    if (isDeleting) {
        typedText.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typedText.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentString.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % typedStrings.length;
        typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect
if (typedText) {
    setTimeout(typeEffect, 1000);
}

// ===================================
// Navigation
// ===================================

// Navbar scroll effect
function handleNavScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Mobile menu toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===================================
// Theme Toggle
// ===================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (!prefersDark) {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Initialize theme
initTheme();

// ===================================
// Scroll Animations (AOS-style)
// ===================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===================================
// Skill Progress Bars
// ===================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = `${progress}%`;
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===================================
// Counter Animation
// ===================================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ===================================
// Project Filtering
// ===================================
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');

            if (filter === 'all' || categories.includes(filter)) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===================================
// Project Modal
// ===================================
const projectData = {
    1: {
        title: 'Sales Dashboard Analytics',
        overview: 'An interactive Tableau dashboard that analyzes over $2 million in sales data with real-time KPI tracking, trend analysis, and forecasting capabilities.',
        features: [
            'Real-time sales tracking with automated data refresh',
            'Interactive filters for region, product, and time period',
            'Predictive analytics for sales forecasting',
            'Mobile-responsive design for on-the-go insights'
        ],
        technologies: ['Tableau', 'SQL', 'Python', 'Excel'],
        demoLink: '#',
        codeLink: 'https://github.com'
    },
    2: {
        title: 'Customer Churn Prediction',
        overview: 'A machine learning model that predicts customer churn with 89% accuracy, enabling proactive retention strategies that save an estimated $500K annually.',
        features: [
            'Feature engineering from 50+ customer attributes',
            'Ensemble model combining Random Forest and XGBoost',
            'SHAP values for explainable predictions',
            'Automated weekly retraining pipeline'
        ],
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost'],
        demoLink: '#',
        codeLink: 'https://github.com'
    },
    3: {
        title: 'E-commerce Database Analysis',
        overview: 'Complex SQL analysis of 1M+ transactions identifying purchasing patterns, customer segments, and inventory optimization opportunities.',
        features: [
            'Advanced window functions for cohort analysis',
            'RFM segmentation for customer classification',
            'Market basket analysis for product recommendations',
            'Automated reporting with stored procedures'
        ],
        technologies: ['PostgreSQL', 'Python', 'Excel', 'Power BI'],
        demoLink: '#',
        codeLink: 'https://github.com'
    },
    4: {
        title: 'COVID-19 Data Tracker',
        overview: 'Real-time Power BI dashboard tracking pandemic metrics across 50+ countries with automated daily data refresh from official sources.',
        features: [
            'Automated API data collection and cleaning',
            'Time series visualization with trend analysis',
            'Geographic mapping with drill-down capabilities',
            'Comparative analysis across regions'
        ],
        technologies: ['Power BI', 'Python', 'REST API', 'DAX'],
        demoLink: '#',
        codeLink: 'https://github.com'
    },
    5: {
        title: 'Stock Price Forecasting',
        overview: 'Time series analysis using ARIMA and LSTM neural networks to predict stock price movements with 76% directional accuracy.',
        features: [
            'Technical indicator feature engineering',
            'ARIMA for short-term predictions',
            'LSTM network for pattern recognition',
            'Backtesting framework for strategy validation'
        ],
        technologies: ['Python', 'TensorFlow', 'Pandas', 'yFinance'],
        demoLink: '#',
        codeLink: 'https://github.com'
    },
    6: {
        title: 'HR Analytics Dashboard',
        overview: 'Comprehensive employee attrition analysis identifying key factors and providing actionable retention strategies for HR teams.',
        features: [
            'Attrition risk scoring model',
            'Department and role-based analysis',
            'Compensation benchmarking insights',
            'Interactive what-if scenario planning'
        ],
        technologies: ['Tableau', 'SQL', 'R', 'Excel'],
        demoLink: '#',
        codeLink: 'https://github.com'
    }
};

// Open modal
document.querySelectorAll('.project-link[data-project]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.getAttribute('data-project');
        const project = projectData[projectId];

        if (project) {
            document.querySelector('.modal-title').textContent = project.title;
            document.querySelector('.modal-description').innerHTML = `
                <h3>Overview</h3>
                <p>${project.overview}</p>

                <h3>Key Features</h3>
                <ul>
                    ${project.features.map(f => `<li>${f}</li>`).join('')}
                </ul>

                <h3>Technologies Used</h3>
                <div class="modal-tags">
                    ${project.technologies.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
            `;

            document.querySelector('.modal-links').innerHTML = `
                <a href="${project.demoLink}" class="btn btn-primary" target="_blank">Live Demo</a>
                <a href="${project.codeLink}" class="btn btn-secondary" target="_blank">View Code</a>
            `;

            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (projectModal) {
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
    }
});

// ===================================
// Contact Form
// ===================================
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!data.name || !data.email || !data.message) {
            showFormStatus('Please fill in all required fields.', 'error');
            return;
        }

        if (!isValidEmail(data.email)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission (replace with actual backend)
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';

        setTimeout(() => {
            showFormStatus('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <span>Send Message</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            `;
        }, 1500);
    });
}

function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;

    setTimeout(() => {
        formStatus.className = 'form-status';
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// Back to Top Button
// ===================================
function handleBackToTop() {
    if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.pointerEvents = 'auto';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.pointerEvents = 'none';
    }
}

if (backToTop) {
    backToTop.style.opacity = '0';
    backToTop.style.transition = 'opacity 0.3s ease';

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Data Particles Background
// ===================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random properties
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--accent-primary);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: ${Math.random() * 0.5 + 0.1};
            animation: float ${duration}s ${delay}s infinite ease-in-out;
        `;

        particlesContainer.appendChild(particle);
    }

    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-20px) translateX(10px);
            }
            50% {
                transform: translateY(-10px) translateX(-10px);
            }
            75% {
                transform: translateY(-30px) translateX(5px);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Footer Year
// ===================================
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// ===================================
// Scroll Event Listeners
// ===================================
window.addEventListener('scroll', () => {
    handleNavScroll();
    updateActiveNavLink();
    handleBackToTop();
});

// ===================================
// Initialize on DOM Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    animateSkillBars();
    animateCounters();
    createParticles();
    handleNavScroll();
    updateActiveNavLink();
});

// ===================================
// Preloader (Optional)
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
